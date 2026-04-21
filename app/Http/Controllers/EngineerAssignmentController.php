<?php

namespace App\Http\Controllers;

use App\Models\ScheduledEngineerTransfer; // ✅ was missing
use App\Models\District;
use App\Models\User;
use App\Models\Area;
use App\Models\AreaEngineer;
use App\Models\DistrictEngineer;
use App\Models\EngineerMovementLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;

class EngineerAssignmentController extends Controller
{
    public function index()
    {
        $districts = District::with('areas', 'engineer')->get();

        $engineers = User::whereHas('designation', function ($q) {
            $q->where('name', 'Field Engineer');
        })->get();

        $areaAssignments = AreaEngineer::all();

        return Inertia::render('ConfigFiles/Field-Eng/Index', [
            'districts'          => $districts,
            'engineers'          => $engineers,
            'areaAssignments'    => $areaAssignments,
            'scheduledTransfers' => ScheduledEngineerTransfer::with(['engineer', 'area', 'district'])
                ->where('status', 'pending')
                ->orderBy('scheduled_at')
                ->get()
                ->map(fn($t) => [
                    'id'            => $t->id,
                    'engineer_id'   => $t->engineer_id,
                    'engineer_name' => $t->engineer?->name,
                    'district_id'   => $t->district_id,
                    'district_name' => $t->district?->name,
                    'area_id'       => $t->area_id,
                    'area_name'     => $t->area?->name,
                    'scheduled_at'  => $t->scheduled_at->toIso8601String(),
                    'status'        => $t->status,
                    'notes'         => $t->notes,
                    'scheduled_by'  => $t->scheduled_by,
                    'applied_at'    => $t->applied_at?->toIso8601String(),
                    'applied_by'    => $t->applied_by,
                ]),
        ]);
    }

    public function store(Request $request)
    {
        try {
            DB::transaction(function () use ($request) {

                $districtId = $request->district_id;

                $previousEngineer     = DistrictEngineer::with('user')
                    ->where('district_id', $districtId)
                    ->first();
                $previousEngineerName = $previousEngineer?->user?->name ?? '—';

                $newBaseEngineerName = $request->base_engineer
                    ? User::find($request->base_engineer)?->name ?? '—'
                    : '—';

                if ($request->base_engineer) {
                    DistrictEngineer::updateOrCreate(
                        ['district_id' => $districtId],
                        ['user_id'     => $request->base_engineer]
                    );
                } else {
                    DistrictEngineer::where('district_id', $districtId)->delete();
                }

                $areas   = Area::where('district_id', $districtId)->get();
                $areaIds = $areas->pluck('id');

                $overrides = $request->overrides ?? [];

                // STEP 1: Get previous per-area assignment BEFORE deleting
                $previousAssignments = [];
                foreach ($areas as $area) {
                    $override = AreaEngineer::where('area_id', $area->id)->first();
                    $previousAssignments[$area->id] = $override
                        ? $override->user_id
                        : $previousEngineer?->user_id;
                }

                // STEP 2: Delete old overrides
                AreaEngineer::whereIn('area_id', $areaIds)->delete();

                // STEP 3: Process new assignments
                foreach ($areas as $area) {
                    $overrideUserId = $overrides[$area->id] ?? null;
                    $newUserId      = $overrideUserId ?: $request->base_engineer;
                    $previousUserId = $previousAssignments[$area->id] ?? null;

                    if ($overrideUserId) {
                        AreaEngineer::create([
                            'area_id' => $area->id,
                            'user_id' => $overrideUserId,
                        ]);
                    }

                    if ($previousUserId != $newUserId) {
                        EngineerMovementLog::create([
                            'area_name'         => $area->name,
                            'previous_engineer' => User::find($previousUserId)?->name ?? '—',
                            'new_engineer'      => User::find($newUserId)?->name ?? '—',
                            'assigned_by'       => Auth::user()?->name ?? '—',
                            'effectivity_date'  => now()->toDateString(),
                        ]);
                    }
                }
            });

            return back()->with('success', 'Assignment saved!');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function saveAreaOverride(Request $request)
    {
        try {
            $areaId     = $request->area_id;
            $areaName   = $request->area_name;
            $overrideId = $request->override_user_id;

            $previous     = AreaEngineer::with('user')->where('area_id', $areaId)->first();
            $previousName = $previous?->user?->name ?? '—';

            $newName = $overrideId
                ? User::find($overrideId)?->name ?? '—'
                : User::find($request->base_engineer)?->name ?? '—';

            EngineerMovementLog::create([
                'area_name'         => $areaName,
                'previous_engineer' => $previousName,
                'new_engineer'      => $newName,
                'assigned_by'       => Auth::user()?->name ?? '—',
                'effectivity_date'  => now()->toDateString(),
            ]);

            return back()->with('success', 'Override logged!');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    
    public function logs()
    {
        $movementLogs = EngineerMovementLog::orderByDesc('created_at')->get();

        $allNames = $movementLogs->flatMap(fn($log) => [
            $log->previous_engineer,
            $log->new_engineer,
        ])->filter(fn($n) => $n && $n !== '—')->unique()->values();

        $users = User::with('photo')
            ->get()
            ->filter(fn($user) => $allNames->contains(trim($user->name . ' ' . $user->last_name))
                || $allNames->contains($user->name))
            ->keyBy(fn($user) => trim($user->name . ' ' . $user->last_name));

        $usersByFirstName = $users->keyBy('name');

        $mapped = $movementLogs->map(fn($log) => [
            'id'        => $log->id,
            'area_name' => $log->area_name,

            'district' => optional(
                Area::whereRaw('REPLACE(LOWER(name), " ", "") = ?', [
                    str_replace(' ', '', strtolower($log->area_name))
                ])->with('district')->first()
            )?->district?->name,

            'previous_engineer' => $log->previous_engineer,
            'new_engineer'      => $log->new_engineer,
            'assigned_by'       => $log->assigned_by,
            'effectivity_date'  => $log->effectivity_date,
            'created_at'        => $log->created_at,

            'previous_engineer_photo' => ($users[$log->previous_engineer]
                ?? $usersByFirstName[$log->previous_engineer]
                ?? null)?->photo?->path,

            'new_engineer_photo' => ($users[$log->new_engineer]
                ?? $usersByFirstName[$log->new_engineer]
                ?? null)?->photo?->path,
        ]);

        // ✅ Pass pending scheduled transfers so the logs page can show the badge
        $scheduledTransfers = ScheduledEngineerTransfer::with(['engineer', 'area', 'district'])
            ->where('status', 'pending')
            ->orderBy('scheduled_at')
            ->get()
            ->map(fn($t) => [
                'id'            => $t->id,
                'engineer_id'   => $t->engineer_id,
                'engineer_name' => $t->engineer?->name,
                'district_id'   => $t->district_id,
                'district_name' => $t->district?->name,
                'area_id'       => $t->area_id,
                'area_name'     => $t->area?->name,
                'scheduled_at'  => $t->scheduled_at->toIso8601String(),
                'status'        => $t->status,
                'notes'         => $t->notes,
                'scheduled_by'  => $t->scheduled_by,
            ]);

            
        return Inertia::render('Navigation/EngineerTransferLogs', [
            
            'logs'               => $mapped,
            'scheduledTransfers' => $scheduledTransfers,
        ]);
    }
}