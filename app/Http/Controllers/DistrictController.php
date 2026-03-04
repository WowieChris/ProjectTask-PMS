<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'division_id' => ['required', 'exists:divisions,id'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        $exists = District::where('division_id', $data['division_id'])
            ->where('name', $data['name'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['name' => 'District already exists in this Division.']);
        }

        District::create($data);

        return back()->with('success', 'District added.');
    }

    public function destroy(District $district)
    {
        $district->delete();
        return back()->with('success', 'District deleted.');
    }
}