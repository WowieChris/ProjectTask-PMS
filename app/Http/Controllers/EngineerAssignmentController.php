<?php

namespace App\Http\Controllers;

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
            'districts'       => $districts,
            'engineers'       => $engineers,
            'areaAssignments' => $areaAssignments,
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

                // ✅ STEP 1: Get previous per-area assignment BEFORE deleting
                $previousAssignments = [];

                foreach ($areas as $area) {
                    $override = AreaEngineer::where('area_id', $area->id)->first();

                    $previousAssignments[$area->id] = $override
                        ? $override->user_id
                        : $previousEngineer?->user_id;
                }

                // ✅ STEP 2: NOW delete old overrides
                AreaEngineer::whereIn('area_id', $areaIds)->delete();

                // ✅ STEP 3: Process new assignments
                foreach ($areas as $area) {

                    $overrideUserId = $overrides[$area->id] ?? null;

                    $newUserId = $overrideUserId ?: $request->base_engineer;

                    $previousUserId = $previousAssignments[$area->id] ?? null;

                    if ($overrideUserId) {
                        AreaEngineer::create([
                            'area_id' => $area->id,
                            'user_id' => $overrideUserId,
                        ]);
                    }

                    // ✅ NOW this will work correctly
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

            // Get previous engineer for this area
            $previous     = AreaEngineer::with('user')->where('area_id', $areaId)->first();
            $previousName = $previous?->user?->name ?? '—';

            $newName = $overrideId
                ? User::find($overrideId)?->name ?? '—'
                : User::find($request->base_engineer)?->name ?? '—';

            // ✅ ONLY log — do NOT touch area_engineers
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
}
