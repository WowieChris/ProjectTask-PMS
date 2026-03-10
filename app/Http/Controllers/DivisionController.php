<?php

namespace App\Http\Controllers;

use App\Models\Division;
use App\Models\UserGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function index()
    {
        return Inertia::render('Divisions/Index', [
            'userGroups' => UserGroup::all(),
            'divisions' => Division::with('userGroup')->get(),
        ]);
        $divisions = Division::with('districts.areas.branches')->get();

        return Inertia::render('Browse/Index', [
            'divisions' => $divisions
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_group_id' => ['required', 'exists:user_groups,id'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        Division::create($data);

        return back()->with('success', 'Division added.');
    }

    public function destroy(Division $division)
    {
        $division->delete();

        return back()->with('success', 'Division deleted.');
    }
}
