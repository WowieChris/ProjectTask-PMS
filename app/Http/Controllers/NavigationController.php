<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Inertia\Inertia;
use App\Models\UserGroup;
use Illuminate\Http\Request;
use App\Models\District;
use App\Models\Area;
use App\Models\Branch;
use App\Models\AreaEngineer;
use App\Models\User;
use App\Models\DistrictEngineer;
use Illuminate\Support\Facades\DB;

class NavigationController extends Controller
{

    // public function index()
    // {
    //     $divisions = Division::with('districts.areas.branches')->get();

    //     return Inertia::render('ConfigFiles/Navigation/Index', [
    //         'userGroups' => UserGroup::all(),
    //         'divisions' => Division::with('districts.areas.branches')->get(),
    //     ]);
    // }
    public function index(Request $request)
    {
        $userGroupId = $request->input('user_group_id');

        $divisions = Division::with('districts.areas.branches')->get();
        $districts = District::with([
            'areas',
            'engineer' // base engineer
        ])->get();

        $engineers = User::whereHas('designation', function ($q) {
            $q->where('name', 'Field Engineer');
        })->get();

        $areaAssignments = AreaEngineer::all();

        // ✅ FILTER SENIOR FIELD (SFE)

        $seniorFields = User::whereHas('designation', function ($q) {
            $q->where('name', 'Senior Field Engineer');
        })
            ->when($userGroupId, function ($query) use ($userGroupId) {
                $query->where('user_group_id', $userGroupId);
            })
            ->get();


        return Inertia::render('ConfigFiles/Navigation/Index', [
            'userGroups'   => UserGroup::all(),
            'seniorFields' => $seniorFields, // ✅ THIS IS WHAT YOU WILL DISPLAY
            'districts'       => District::with(['areas', 'engineer'])->get(),
            'engineers'       => User::whereHas('designation', fn($q) => $q->where('name', 'Field Engineer'))->get(),
            'areaAssignments' => $areaAssignments,
            'divisions' => Division::with('districts.areas.branches')->get(),
        ]);
    }

    public function move(Request $request)
    {
        $request->validate([
            'type'      => 'required|in:district,area,branch',
            'id'        => 'required|integer',
            'parent_id' => 'required|integer',
        ]);

        match ($request->type) {
            'district' => District::findOrFail($request->id)
                ->update(['division_id' => $request->parent_id]),
            'area'     => Area::findOrFail($request->id)
                ->update(['district_id' => $request->parent_id]),
            'branch'   => Branch::findOrFail($request->id)
                ->update(['area_id' => $request->parent_id]),
        };

        return back()->with('success', 'Location moved successfully.');
    }
    // Store
    public function store(Request $request)
    {
        DB::transaction(function () use ($request) {

            // 🔥 SAVE BASE ENGINEER
            if ($request->base_engineer) {
                DistrictEngineer::updateOrCreate(
                    ['district_id' => $request->district_id],
                    ['user_id' => $request->base_engineer]
                );
            } else {
                DistrictEngineer::where('district_id', $request->district_id)->delete();
            }

            // 🔥 SAVE AREA OVERRIDES
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
    }
}
