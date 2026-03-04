<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\District;
use App\Models\Division;
use App\Models\UserGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserGroupController extends Controller
{
    public function index(Request $request)
{
    $ugId = $request->integer('ug');
    $divisionId = $request->integer('division');

    $userGroups = UserGroup::orderBy('name')->get(['id','name']);

    $selectedUserGroup = $ugId ? UserGroup::find($ugId, ['id','name']) : null;

    $divisions = $ugId
        ? Division::where('user_group_id', $ugId)->orderBy('name')->get(['id','user_group_id','name'])
        : collect();

    if ($divisionId && !$divisions->contains('id', $divisionId)) {
        $divisionId = null;
    }

    $selectedDivision = $divisionId ? Division::find($divisionId, ['id','user_group_id','name']) : null;

    $districts = $divisionId
        ? District::where('division_id', $divisionId)->orderBy('name')->get(['id','division_id','name'])
        : collect();

    return Inertia::render('UserGroups/Index', [
        'userGroups' => $userGroups,
        'selectedUserGroup' => $selectedUserGroup,
        'divisions' => $divisions,
        'selectedDivision' => $selectedDivision,
        'districts' => $districts,
    ]);
}
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:255','unique:user_groups,name'],
        ]);

        UserGroup::create($data);

        return back()->with('success', 'User Group saved.');
    }

    public function destroy(UserGroup $userGroup)
    {
        $userGroup->delete();
        return back()->with('success', 'User Group deleted.');
    }
}