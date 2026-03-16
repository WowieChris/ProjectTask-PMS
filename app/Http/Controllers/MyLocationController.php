<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\District;
use App\Models\Area;
use App\Models\Branch;

class MyLocationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $district = \App\Models\District::where('name', $user->district)
            ->with([
                'areas.branches'
            ])
            ->first();

        return Inertia::render('MyLocation/Index', [
            'district' => $district
        ]);
    }
}
