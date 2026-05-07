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
        $branches = Branch::with(['district', 'area'])->get();

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
            'name'    => 'required|string|max:255',
        ]);

        $area = Area::findOrFail($request->area_id);

        Branch::create([
            'name'        => $request->name,
            'area_id'     => $area->id,
            'district_id' => $area->district_id, // ← auto-derived
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'area_id' => 'required|exists:areas,id',
            'name'    => 'required|string|max:255',
        ]);

        $area   = Area::findOrFail($request->area_id);
        $branch = Branch::findOrFail($id);

        $branch->update([
            'name'        => $request->name,
            'area_id'     => $area->id,
            'district_id' => $area->district_id, // ← auto-derived
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        Branch::findOrFail($id)->delete();

        return redirect()->back();
    }
}
