<?php

namespace App\Http\Controllers;

use App\Models\Division;
use App\Models\User;
use App\Models\DivisionEngineer;
use App\Models\DistrictEngineer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SeniorFieldAssignmentController extends Controller
{
    public function index()
    {
        $divisions = Division::with([
            'districts',
            'engineer', // base senior engineer per division
        ])->get();

        $engineers = User::whereHas('designation', function ($q) {
            $q->where('name', 'Senior Field Engineer');
        })->get();

        $districtOverrides = DistrictEngineer::all();

        return Inertia::render('ConfigFiles/SFE/Index', [
            'divisions'         => $divisions,
            'engineers'         => $engineers,
            'districtOverrides' => $districtOverrides,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'division_id'    => 'required|exists:divisions,id',
            'base_engineer'  => 'nullable|exists:users,id',
            'overrides'      => 'array',
            'overrides.*'    => 'nullable|exists:users,id',
        ]);

        DB::transaction(function () use ($request) {

            // SAVE BASE SENIOR ENGINEER per division
            if ($request->base_engineer) {
                DivisionEngineer::updateOrCreate(
                    ['division_id' => $request->division_id],
                    ['user_id'     => $request->base_engineer]
                );
            } else {
                DivisionEngineer::where('division_id', $request->division_id)->delete();
            }

            // SAVE DISTRICT OVERRIDES
            foreach ($request->overrides as $district_id => $user_id) {
                if ($user_id) {
                    DistrictEngineer::updateOrCreate(
                        ['district_id' => $district_id],
                        ['user_id'     => $user_id]
                    );
                } else {
                    DistrictEngineer::where('district_id', $district_id)->delete();
                }
            }
        });

        return back()->with('success', 'Senior Engineer assignment saved!');
    }
}