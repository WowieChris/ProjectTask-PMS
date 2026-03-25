<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Inertia\Inertia;
use App\Models\UserGroup;

class BrowseController extends Controller
{
        public function index()
        {
            $divisions = Division::with('districts.areas.branches')->get();

            return Inertia::render('Browse/Index', [
                'userGroups' => UserGroup::all(),
                'divisions' => Division::with('districts.areas.branches')->get(),
            ]);
        }
}
