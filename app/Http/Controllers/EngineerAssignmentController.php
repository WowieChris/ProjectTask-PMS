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

                // ✅ SAVE BASE ENGINEER (correct way)
                if ($request->base_engineer) {
                    DistrictEngineer::updateOrCreate(
                        ['district_id' => $request->district_id],
                        ['user_id' => $request->base_engineer]
                    );
                }

                // ✅ AREA OVERRIDES
                foreach ($request->overrides as $area_id => $user_id) {

                    if ($user_id) {
                        AreaEngineer::updateOrCreate(
                            ['area_id' => $area_id],
                            ['user_id' => $user_id]
                        );
                    } else {
                        AreaEngineer::where('area_id', $area_id)->delete();
                    }
                }
            });

            return back()->with('success', 'Assignment saved!');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
