<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\District;
use App\Models\Division;

class BranchController extends Controller
{
    public function index()
    {
        $branches = Branch::with([
            'area.district.division'
        ])->get();

        return Inertia::render('Branches/Index', [
            'branches' => $branches,
            'areas' => Area::all(),
            'districts' => District::all(),
            'divisions' => Division::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'area_id' => 'required|exists:areas,id',
            'name' => 'required|string|max:255',
            'district_id' => 'nullable|exists:districts,id',
            'division_id' => 'nullable|exists:divisions,id',
        ]);

        Branch::create([
            'area_id' => $request->area_id,
            'name' => $request->name,
        ]);



        return redirect()->back();
    }

    public function destroy($id)
    {
        Branch::findOrFail($id)->delete();

        return redirect()->back();
    }
}
