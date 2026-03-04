<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'area_id' => ['required', 'exists:areas,id'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        $exists = Division::where('area_id', $data['area_id'])
            ->where('name', $data['name'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['name' => 'Division already exists in this Area.']);
        }

        Division::create($data);

        return back()->with('success', 'Division added.');
    }

    public function destroy(Division $division)
    {
        $division->delete();
        return back()->with('success', 'Division deleted.');
    }
}