<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DesignationsController extends Controller
{
    /**
     * Display a listing of designations.
     */
    public function index()
    {
        $designations = Designation::orderBy('name')->get();

        return Inertia::render('designations/index', [
    'designations' => $designations
]);
    }

    /**
     * Store a newly created designation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:designations,name',
            'description' => 'nullable|string|max:255'
        ]);

        Designation::create($validated);

        return redirect()->back()->with('success', 'Designation created successfully.');
    }

    /**
     * Update the specified designation.
     */
    public function update(Request $request, $id)
    {
        $designation = Designation::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:designations,name,' . $designation->id,
            'description' => 'nullable|string|max:255'
        ]);

        $designation->update($validated);

        return redirect()->back()->with('success', 'Designation updated successfully.');
    }

    /**
     * Remove the specified designation.
     */
    public function destroy($id)
    {
        $designation = Designation::findOrFail($id);

        $designation->delete();

        return redirect()->back()->with('success', 'Designation deleted successfully.');
    }

    /**
     * Return counts of users grouped by designation.
     * (similar to your DashboardController)
     */
    public function counts()
    {
        $data = DB::table('users')
            ->select('designation', DB::raw('count(*) as count'))
            ->groupBy('designation')
            ->orderByDesc('count')
            ->get();

        return response()->json($data);
    }
}