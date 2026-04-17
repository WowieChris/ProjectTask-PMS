<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\District;
use App\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function index()
    {
        // $districts = District::with('division.area.userGroup')->get();
        // return Inertia::render('Districts/Index', [
        //     'districts' => $districts,
        // ]);
        $districts = District::with([
            'division.userGroup'
        ])->get();

        return Inertia::render('Districts/Index', [
            'districts' => $districts,
            'divisions' => Division::with('userGroup')->get(),
        ]);

        // $districts = District::with(['division.userGroup'])->get();

        // $divisions = Division::all();

        return Inertia::render('Districts/Index', [
            'districts' => $districts,
            'divisions' => $divisions,
        ]);
    }

    public function update(Request $request, District $district)
    {

        $data = $request->validate([
            'division_id' => ['required', 'exists:divisions,id'],
            'name'        => ['required', 'string', 'max:255'],
            'address'     => ['required', 'string', 'max:255'],
        ]);
        $district->update($data);

        return back()->with('success', 'District updated.');
    }
}
