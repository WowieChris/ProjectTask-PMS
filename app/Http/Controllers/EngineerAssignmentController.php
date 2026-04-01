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
        $districts = District::with('areas')->get();

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
        try{
        DB::transaction(function () use ($request) {

            // ✅ UPDATE USERS TABLE
            if ($request->base_engineer) {
                User::where('id', $request->base_engineer)
                    ->update(['district_id' => $request->district_id]);
            }

            // ✅ AREA OVERRIDES (keep this)
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
        return back()->with('error', $e->getMessage()); // 👈 shows exact error
    }}
}
