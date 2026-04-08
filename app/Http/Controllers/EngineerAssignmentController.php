<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\User;
use App\Models\AreaEngineer;
use App\Models\DistrictEngineer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
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
            'districts' => $districts,
            'engineers' => $engineers,
            'areaAssignments' => $areaAssignments,
        ]);
    }
    public function store(Request $request)
    {
        try {
            DB::transaction(function () use ($request) {

                // 1. Save or clear base engineer
                if ($request->base_engineer) {
                    DistrictEngineer::updateOrCreate(
                        ['district_id' => $request->district_id],
                        ['user_id' => $request->base_engineer]
                    );
                } else {
                    DistrictEngineer::where('district_id', $request->district_id)->delete();
                }

                // 2. ALWAYS delete old overrides first
                $areaIds = \App\Models\Area::where('district_id', $request->district_id)
                    ->pluck('id');
                AreaEngineer::whereIn('area_id', $areaIds)->delete();

                // 3. Re-insert only if overrides exist
                $overrides = $request->overrides ?? []; // ← handle null/empty
                foreach ($overrides as $area_id => $user_id) {
                    if ($user_id) {
                        AreaEngineer::create([
                            'area_id' => $area_id,
                            'user_id' => $user_id,
                        ]);
                    }
                }
            });

            return back()->with('success', 'Assignment saved!');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
