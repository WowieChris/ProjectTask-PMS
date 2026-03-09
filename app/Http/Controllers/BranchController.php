<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Area;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function index($areaId)
    {
        $area = Area::findOrFail($areaId);

        return Inertia::render('Branches/Index', [
            'area' => $area,
            'branches' => Branch::where('area_id', $areaId)->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'area_id' => 'required'
        ]);

        Branch::create($request->only('name', 'area_id'));

        return redirect()->back();
    }

    public function destroy($id)
    {
        Branch::findOrFail($id)->delete();

        return redirect()->back();
    }
    public function all()
    {
        return Inertia::render('Branches/Index', [
            'branches' => Branch::with('area')->get()
        ]);
    }
}
