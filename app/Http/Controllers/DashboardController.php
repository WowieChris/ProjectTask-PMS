<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Return counts of users grouped by designation.
     */
    public function designations(Request $request)
    {
        $data = User::select('designation', DB::raw('count(*) as count'))
            ->groupBy('designation')
            ->orderByDesc('count')
            ->get();

        return response()->json($data);
    }
}
