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
            'designations' => $designations,
            'role' => 'required|in:user,admin',
        ]);
    }

    /**
     * Store a newly created designation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:designations,name',
            'role' => 'required|in:user,admin',
        ]);

        Designation::create($validated);

        return redirect()->back()->with('success', 'Designation created successfully.');
    }

    /**
     * Update the specified designation.
     */
    public function update(Request $request, Designation $designation)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'permissions' => 'nullable|array',
        ]);

        $designation->update([
            'name' => $validated['name'],
            'role' => $validated['role'],
            'permissions' => $validated['permissions'] ?? [],
        ]);

        return back();
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
