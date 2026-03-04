<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function index()
    {
        return Inertia::render('Divisions/Index', [
            'areas' => Area::with('userGroup')->orderBy('name')->get(['id','user_group_id','name']),
            'divisions' => Division::with('area.userGroup')
                ->orderBy('name')
                ->get(['id','area_id','name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'area_id' => ['required', 'exists:areas,id'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        // optional duplicate protection per area
        $exists = Division::where('area_id', $data['area_id'])
            ->where('name', $data['name'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['name' => 'Division already exists in this area.']);
        }

        Division::create($data);

        return back()->with('success', 'Division saved.');
    }

    public function destroy(Division $division)
    {
        $division->delete();
        return back()->with('success', 'Division deleted.');
    }
}