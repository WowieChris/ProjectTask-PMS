<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class EAHVAController extends Controller
{
    public function index()
    {
        return Inertia::render('EAMonitoring/HVA/Index', [
            'hva_records' => []
        ]);
    }
}