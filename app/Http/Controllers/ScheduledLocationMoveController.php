<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Branch;
use App\Models\District;
use App\Models\LocationMovementLog;
use App\Models\ScheduledLocationMove;
use App\Models\LocationTransferLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;

class ScheduledLocationMoveController extends Controller
{
    private function authorise(): void
    {
        abort_unless(Auth::user()?->role === 'admin', 403);
    }

    // ── Store ────────────────────────────────────────────────────
    // location_type    string   district|area|branch
    // location_id      int
    // target_parent_id int      the new parent's id
    // scheduled_at     datetime
    // notes            string|null
    public function store(Request $request)
    {
        $this->authorise();

        $request->validate([
            'location_type'    => ['required', 'in:district,area,branch'],
            'location_id'      => ['required', 'integer'],
            'target_parent_id' => ['required', 'integer'],
            'scheduled_at'     => ['required', 'date', 'after:now'],
            'notes'            => ['nullable', 'string', 'max:500'],
        ]);

        try {
            ScheduledLocationMove::create([
                'location_type'    => $request->location_type,
                'location_id'      => $request->location_id,
                'target_parent_id' => $request->target_parent_id,
                'scheduled_at'     => $request->scheduled_at,
                'status'           => 'pending',
                'scheduled_by'     => Auth::user()?->name ?? '—',
                'notes'            => $request->notes,
            ]);

            return back()->with('success', 'Location move scheduled successfully.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    // ── Manual apply ──────────────────────────────────────────────
    public function apply(ScheduledLocationMove $scheduledLocationMove)
    {
        $this->authorise();

        if ($scheduledLocationMove->status !== 'pending') {
            return back()->with('error', 'This move has already been ' . $scheduledLocationMove->status . '.');
        }

        try {
            DB::transaction(fn() => self::applyMove($scheduledLocationMove, Auth::user()?->name ?? '—'));
            return back()->with('success', 'Location move applied successfully.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    // ── Cancel ────────────────────────────────────────────────────
    public function cancel(ScheduledLocationMove $scheduledLocationMove)
    {
        $this->authorise();

        if ($scheduledLocationMove->status !== 'pending') {
            return back()->with('error', 'Only pending moves can be cancelled.');
        }

        $scheduledLocationMove->update(['status' => 'cancelled']);
        return back()->with('success', 'Scheduled move cancelled.');
    }

    // ── Core logic — static so the Artisan command can call it ────
    public static function applyMove(
    ScheduledLocationMove $move,
    string $appliedBy = 'System (Scheduler)'
): void {
    $type           = $move->location_type;
    $locationId     = $move->location_id;
    $targetParentId = $move->target_parent_id;
    $oldParentId    = null;

    switch ($type) {
        case 'district':
            $location    = District::findOrFail($locationId);
            $oldParentId = $location->division_id;
            $oldParentName = optional(\App\Models\Division::find($oldParentId))->name ?? '—';
            $newParentName = optional(\App\Models\Division::find($targetParentId))->name ?? '—';
            $location->update(['division_id' => $targetParentId]);
            break;

        case 'area':
            $location    = Area::findOrFail($locationId);
            $oldParentId = $location->district_id;
            $oldParentName = optional(District::find($oldParentId))->name ?? '—';
            $newParentName = optional(District::find($targetParentId))->name ?? '—';
            $location->update(['district_id' => $targetParentId]);
            break;

        case 'branch':
            $location    = Branch::findOrFail($locationId);
            $oldParentId = $location->area_id;
            $oldParentName = optional(Area::find($oldParentId))->name ?? '—';
            $newParentName = optional(Area::find($targetParentId))->name ?? '—';
            $location->update(['area_id' => $targetParentId]);
            break;

        default:
            throw new \InvalidArgumentException("Unknown location type: {$type}");
    }

    LocationTransferLog::create([
        'type'             => $type,
        'location_id'      => $locationId,
        'location_name'    => $location->name,
        'from_parent_id'   => $oldParentId,
        'from_parent_name' => $oldParentName,
        'to_parent_id'     => $targetParentId,
        'to_parent_name'   => $newParentName,
        'effectivity_date' => $move->scheduled_at->toDateString(),
        'moved_by'         => null,
    ]);

    $move->update([
        'status'     => 'applied',
        'applied_at' => now(),
        'applied_by' => $appliedBy,
    ]);
}
}