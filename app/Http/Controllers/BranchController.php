<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function index()
    {
        $areas = Area::all();
        $branches = Branch::with('area')->get();

        return Inertia::render('Branches/Index', [
            'areas' => $areas,
            'branches' => $branches,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'area_id' => 'required|exists:areas,id',
            'name' => 'required|string|max:255',
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
