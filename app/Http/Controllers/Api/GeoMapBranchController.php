<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeoMapBranchController extends Controller
{
    public function index()
    {
        // return Branch::latest()->get();
        return Inertia::render('GeoMap/Index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'address' => ['nullable'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
        ]);

        $branch = Branch::create($validated);

        return response()->json($branch, 201);
    }

    public function show(Branch $branch)
    {
        return $branch;
    }

    public function update(
        Request $request,
        Branch $branch
    ) {
        $validated = $request->validate([
            'name' => ['required'],
            'address' => ['nullable'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
        ]);

        $branch->update($validated);

        return response()->json($branch);
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}
