<?php

namespace App\Http\Controllers;

use App\Models\ServiceOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceOrderController extends Controller
{
    public function index()
    {
        $orders = ServiceOrder::latest()->get();

        return Inertia::render('Service-Order/Index', [
            'orders' => $orders
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tse_assigned' => 'required',
            'requesting_party' => 'required',
            'department' => 'required',
            'location' => 'required',
        ]);

        ServiceOrder::create([
            'tse_jo_no' => 'TSE-' . time(),
            'tse_assigned' => $request->tse_assigned,
            'requesting_party' => $request->requesting_party,
            'department' => $request->department,
            'location' => $request->location,
            'date_reported' => now(),
            'status' => 'Pending'
        ]);

        return redirect()->back();
    }
}
