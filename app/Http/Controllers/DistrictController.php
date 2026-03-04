<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    public function index()
    {
        return Inertia::render('Districts/Index', [
            'divisions' => Division::orderBy('name')->get(['id','name']),
            'districts' => District::with('division')
                ->orderBy('name')
                ->get(['id','division_id','name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'division_id' => ['required','exists:divisions,id'],
            'name' => ['required','string','max:255'],
        ]);

        District::create($data);

        return back()->with('success', 'District saved.');
    }

    public function destroy(District $district)
    {
        $district->delete();
        return back()->with('success', 'District deleted.');
    }
}