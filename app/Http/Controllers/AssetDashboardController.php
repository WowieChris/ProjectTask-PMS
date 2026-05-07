<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AssetDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('AssetManagement/Dashboard/Index'); // ✅ dashboard
    }
}
