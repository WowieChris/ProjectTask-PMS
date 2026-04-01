<?php

// namespace App\Http\Controllers;

// use App\Models\Area;
// use App\Models\District;
// use App\Models\Division;
// use App\Models\UserGroup;
// use Illuminate\Http\Request;
// use Inertia\Inertia;

// class UserGroupController extends Controller
// {
//     public function index(Request $request)
// {
//     $ugId = $request->integer('ug');
//     $divisionId = $request->integer('division');

//     $userGroups = UserGroup::orderBy('name')->get(['id','name']);

//     $selectedUserGroup = $ugId ? UserGroup::find($ugId, ['id','name']) : null;

//    $ugId = $request->integer('ug');

// $divisions = $ugId
//   ? Division::where('user_group_id', $ugId)->orderBy('name')->get(['id','user_group_id','name'])
//   : collect();

//     if ($divisionId && !$divisions->contains('id', $divisionId)) {
//         $divisionId = null;
//     }

//     $selectedDivision = $divisionId ? Division::find($divisionId, ['id','user_group_id','name']) : null;

//     $districts = $divisionId
//         ? District::where('division_id', $divisionId)->orderBy('name')->get(['id','division_id','name'])
//         : collect();

//     return Inertia::render('UserGroups/Index', [
//         'userGroups' => $userGroups,
//         'selectedUserGroup' => $selectedUserGroup,
//         'divisions' => $divisions,
//         'selectedDivision' => $selectedDivision,
//         'districts' => $districts,
//     ]);
// }
//     public function store(Request $request)
//     {
//         $data = $request->validate([
//             'name' => ['required','string','max:255','unique:user_groups,name'],
//         ]);

//         UserGroup::create($data);

//         return back()->with('success', 'User Group saved.');
//     }

//     public function destroy(UserGroup $userGroup)
//     {
//         $userGroup->delete();
//         return back()->with('success', 'User Group deleted.');
//     }
// }

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Division;
use App\Models\User;
use App\Models\UserGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserGroupController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // FE RULE: only their assigned division + districts
        if ($user && strtolower((string) $user->designation) === 'field engineer') {

            $divisionId = $user->division_id;

            // If FE has no assigned division, show empty
            if (! $divisionId) {
                return Inertia::render('UserGroups/Index', [
                    'userGroups' => collect(),          // hide
                    'selectedUserGroup' => null,
                    'divisions' => collect(),
                    'selectedDivision' => null,
                    'districts' => collect(),
                    'isFE' => true,
                ]);
            }

            $division = Division::with('userGroup')
                ->find($divisionId, ['id', 'user_group_id', 'name']);

            if (! $division) {
                abort(403);
            }

            $divisions = collect([$division]);

            $districts = District::where('division_id', $division->id)
                ->orderBy('name')
                ->get(['id', 'division_id', 'name']);

            return Inertia::render('UserGroups/Index', [
                'userGroups' => collect(),          // hide list
                'selectedUserGroup' => null,
                'divisions' => $divisions,
                'selectedDivision' => $division,    // auto-selected
                'districts' => $districts,
                'isFE' => true,
            ]);
        }

        // NORMAL (Admin / others)
        $ugId = $request->integer('ug');
        $divisionId = $request->integer('division');

        $userGroups = UserGroup::orderBy('name')->get(['id', 'name']);

        $selectedUserGroup = null;
        if ($ugId) {
            $selectedUserGroup = UserGroup::whereKey($ugId)->first(['id', 'name']);
            if (! $selectedUserGroup) {
                $ugId = null;
            }
        }

        $divisions = $ugId
            ? Division::where('user_group_id', $ugId)->orderBy('name')->get(['id', 'user_group_id', 'name'])
            : collect();

        if ($divisionId && ! $divisions->contains('id', $divisionId)) {
            $divisionId = null;
        }

        $selectedDivision = $divisionId
            ? Division::whereKey($divisionId)->first(['id', 'user_group_id', 'name'])
            : null;

        $districts = $divisionId
            ? District::where('division_id', $divisionId)->orderBy('name')->get(['id', 'division_id', 'name'])
            : collect();

        return Inertia::render('UserGroups/Index', [
            'userGroups' => $userGroups,
            'selectedUserGroup' => $selectedUserGroup,
            'divisions' => $divisions,
            'selectedDivision' => $selectedDivision,
            'districts' => $districts,
            'isFE' => false,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:user_groups,name'],
        ]);

        UserGroup::create($data);

        return back()->with('success', 'User Group saved.');
    }

    public function destroy(UserGroup $userGroup)
    {
        $userGroup->delete();

        return back()->with('success', 'User Group deleted.');
    }

    public function assignUserGroup(Request $request)
    {
        $request->validate([
            'senior_field_id' => 'required|exists:users,id',
            'user_group_id' => 'required|exists:user_groups,id',
        ]);

        $user = User::find($request->senior_field_id);
        $user->user_group_id = $request->user_group_id;
        $user->save();

        return back()->with('success', 'Assigned successfully');
    }
}
