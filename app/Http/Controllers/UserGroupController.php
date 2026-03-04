<?php

namespace App\Http\Controllers;

use App\Models\UserGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserGroupController extends Controller
{
    public function index()
    {
        return Inertia::render('UserGroups/Index', [
            'userGroups' => UserGroup::orderBy('name')->get(['id','name']),
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