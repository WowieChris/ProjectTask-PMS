<?php

namespace App\Http\Controllers;

use App\Models\UserGroup;
use App\Models\Division;
use App\Models\District;
use App\Models\Area;
use App\Models\Branch;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $divisions = Division::with([
            'districts.areas.branches'
        ])->get();

        return Inertia::render('Locations/Index', [
            'divisions' => $divisions
        ]);
    }
}
