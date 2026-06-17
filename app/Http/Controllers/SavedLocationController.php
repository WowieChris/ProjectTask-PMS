<?php

namespace App\Http\Controllers;

use App\Models\SavedLocation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SavedLocationController extends Controller
{
    public function index()
    {
        return Inertia::render('GeoMap/Index', [
            'savedLocations' => \App\Models\SavedLocation::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'lat' => 'required|numeric|between:-90,90',
            'lng' => 'required|numeric|between:-180,180',
        ]);

        $location = SavedLocation::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return back()->with('savedLocation', $location);
    }

    public function destroy(SavedLocation $savedLocation)
    {
        $savedLocation->delete();
        return back();
    }
}
