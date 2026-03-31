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
use App\Models\DistrictEngineer;
use App\Models\Engineer;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class NavigationController extends Controller
{
    public function index()
    {
        $divisions = Division::with('districts.areas.branches')->get();
        $districts = District::with([
            'areas',
            'engineer' // base engineer
        ])->get();

        $engineers = User::whereHas('designation', function ($q) {
            $q->where('name', 'Field Engineer');
        })->get();

        $areaAssignments = AreaEngineer::all();

        return Inertia::render('ConfigFiles/Navigation/Index', [
            'userGroups' => UserGroup::all(),
            'districts' => $districts,
            'engineers' => $engineers,
            'areaAssignments' => $areaAssignments,
            'divisions' => Division::with('districts.areas.branches')->get(),
        ]);

        return Inertia::render('Navigation/Index', [
    
    // 👇 add these
    'districts'       => District::with(['areas', 'engineer'])->get(),
    'engineers'       => User::whereHas('designation', fn($q) => $q->where('name', 'Field Engineer'))->get(),
    'areaAssignments' => AreaAssignment::all(),
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
    
}
