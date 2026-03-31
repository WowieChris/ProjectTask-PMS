<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Inertia\Inertia;
use App\Models\UserGroup;
use Illuminate\Http\Request;
use App\Models\District;
use App\Models\Area;
use App\Models\Branch;
use App\Models\User;

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

        // ✅ FILTER SENIOR FIELD (SFE)
        $userGroupId = request('user_group_id');

        $seniorFields = User::when($userGroupId, function ($query) use ($userGroupId) {
            $query->where('user_group_id', $userGroupId);
        })->get();


        return Inertia::render('ConfigFiles/Navigation/Index', [
            'userGroups'   => UserGroup::all(),
            'divisions'    => $divisions,
            'seniorFields' => $seniorFields, // ✅ THIS IS WHAT YOU WILL DISPLAY
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
