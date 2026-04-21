<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\AreaEngineer;
use App\Models\DistrictEngineer;
use App\Models\EngineerMovementLog;
use App\Models\ScheduledEngineerTransfer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;

class ScheduledTransferController extends Controller
{
    private function authorise(): void
    {
        abort_unless(Auth::user()?->role === 'admin', 403);
    }

    // ── Store: accepts the same payload as the assignment panel ───
    // district_id    int
    // base_engineer  int|null
    // overrides      array<area_id, user_id>
    // scheduled_at   datetime string
    // notes          string|null
    public function store(Request $request)
    {
        $this->authorise();

        $request->validate([
            'district_id'   => ['required', 'exists:districts,id'],
            'base_engineer' => ['nullable', 'exists:users,id'],
            'overrides'     => ['nullable', 'array'],
            'overrides.*'   => ['nullable', 'exists:users,id'],
            'scheduled_at'  => ['required', 'date', 'after:now'],
            'notes'         => ['nullable', 'string', 'max:500'],
        ]);

        try {
            DB::transaction(function () use ($request) {
                $districtId  = $request->district_id;
                $scheduledAt = $request->scheduled_at;
                $notes       = $request->notes;
                $scheduledBy = Auth::user()?->name ?? '—';

                // One record for the district-level base engineer
                if ($request->base_engineer) {
                    ScheduledEngineerTransfer::create([
                        'engineer_id'  => $request->base_engineer,
                        'district_id'  => $districtId,
                        'area_id'      => null,
                        'scheduled_at' => $scheduledAt,
                        'status'       => 'pending',
                        'scheduled_by' => $scheduledBy,
                        'notes'        => $notes,
                    ]);
                }

                // One record per area override
                foreach ($request->overrides ?? [] as $areaId => $userId) {
                    if (!$userId) continue;

                    ScheduledEngineerTransfer::create([
                        'engineer_id'  => $userId,
                        'district_id'  => $districtId,
                        'area_id'      => $areaId,
                        'scheduled_at' => $scheduledAt,
                        'status'       => 'pending',
                        'scheduled_by' => $scheduledBy,
                        'notes'        => $notes,
                    ]);
                }
            });

            return back()->with('success', 'Transfer scheduled successfully.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    // ── Manual apply ──────────────────────────────────────────────
    public function apply(ScheduledEngineerTransfer $scheduledTransfer)
    {
        $this->authorise();

        if ($scheduledTransfer->status !== 'pending') {
            return back()->with('error', 'This transfer has already been ' . $scheduledTransfer->status . '.');
        }

        try {
            DB::transaction(fn() => self::applyTransfer($scheduledTransfer, Auth::user()?->name ?? '—'));
            return back()->with('success', 'Transfer applied successfully.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    // ── Cancel ────────────────────────────────────────────────────
    public function cancel(ScheduledEngineerTransfer $scheduledTransfer)
    {
        $this->authorise();

        if ($scheduledTransfer->status !== 'pending') {
            return back()->with('error', 'Only pending transfers can be cancelled.');
        }

        $scheduledTransfer->update(['status' => 'cancelled']);
        return back()->with('success', 'Scheduled transfer cancelled.');
    }

    // ── Core logic — static so the Artisan command can call it ────
    // ✅ MUST be static for ApplyScheduledEngineerTransfers command
    public static function applyTransfer(
        ScheduledEngineerTransfer $transfer,
        string $appliedBy = 'System (Scheduler)'
    ): void {
        $engineer   = $transfer->engineer;
        $districtId = $transfer->district_id;
        $areaId     = $transfer->area_id;

        if ($areaId) {
            // Area-level override
            $previous     = AreaEngineer::with('user')->where('area_id', $areaId)->first();
            $previousName = $previous?->user?->name ?? '—';
            $areaName     = Area::find($areaId)?->name ?? '—';

            AreaEngineer::updateOrCreate(
                ['area_id' => $areaId],
                ['user_id' => $engineer->id]
            );

            EngineerMovementLog::create([
                'area_name'         => $areaName,
                'previous_engineer' => $previousName,
                'new_engineer'      => $engineer->name,
                'assigned_by'       => $appliedBy,
                'effectivity_date'  => $transfer->scheduled_at->toDateString(),
            ]);
        } else {
            // District-level base assignment
            $areas        = Area::where('district_id', $districtId)->get();
            $previous     = DistrictEngineer::with('user')->where('district_id', $districtId)->first();
            $previousName = $previous?->user?->name ?? '—';

            DistrictEngineer::updateOrCreate(
                ['district_id' => $districtId],
                ['user_id'     => $engineer->id]
            );

            foreach ($areas as $area) {
                // Skip areas already covered by a per-area override
                if (AreaEngineer::where('area_id', $area->id)->exists()) continue;

                EngineerMovementLog::create([
                    'area_name'         => $area->name,
                    'previous_engineer' => $previousName,
                    'new_engineer'      => $engineer->name,
                    'assigned_by'       => $appliedBy,
                    'effectivity_date'  => $transfer->scheduled_at->toDateString(),
                ]);
            }
        }

        $transfer->update([
            'status'     => 'applied',
            'applied_at' => now(),
            'applied_by' => $appliedBy,
        ]);
    }
}