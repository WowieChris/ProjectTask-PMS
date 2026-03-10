<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BrowseController extends Controller
{
    public function index()
    {
        return Inertia::render('Browse/Index');
    }
}
