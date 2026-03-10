<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Inertia\Inertia;

class BrowseController extends Controller
{
    public function index()
    {
        $divisions = Division::with('districts.areas.branches')->get();

        return Inertia::render('Browse/Index', [
            'divisions' => $divisions
        ]);
    }
}
