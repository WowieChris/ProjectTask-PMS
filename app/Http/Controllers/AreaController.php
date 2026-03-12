<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\District;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AreaController extends Controller
{
    public function index()
    {
        return Inertia::render('Areas/Index', [
            'districts' => District::all(),
            'areas' => Area::with('district')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'district_id' => 'required|exists:districts,id',
            'name' => 'required|string|max:255',
        ]);

        Area::create([
            'district_id' => $request->district_id,
            'name' => $request->name,
        ]);

        return redirect()->back();
    }

    public function destroy(Area $area)
    {
        $area->delete();

        return back()->with('success', 'Area deleted.');
    }
}
