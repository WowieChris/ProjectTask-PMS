<?php

namespace App\Http\Controllers;

use App\Models\ServiceOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Carbon\Carbon;

class ServiceOrderController extends Controller
{
    public function index()
    {
        $orders = ServiceOrder::latest()->get();

        return Inertia::render('Service-Order/Index', [
            'orders' => ServiceOrder::latest()->get(),
            'technicians' => User::where('role', 'technician')->get(['id', 'name'])
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

        $year = Carbon::now()->year;
        // get last JO this year
        $last = ServiceOrder::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();
        $nextNumber = $last ? intval(substr($last->tse_jo_no, -4)) + 1 : 1;

        $joNumber = 'JO-' . $year . '-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

        ServiceOrder::create([
            'tse_jo_no' => $joNumber,
            'tse_assigned' => $request->tse_assigned,
            'requesting_party' => $request->requesting_party,
            'department' => $request->department,
            'location' => $request->location,
            'issues_encountered' => $request->issues_encountered,
            'date_reported' => now(),
            'status' => 'Pending'
        ]);

        return redirect()->back();
    }
    public function destroy($id)
    {
        $order = ServiceOrder::findOrFail($id);
        $order->delete();

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $order = ServiceOrder::findOrFail($id);

        $order->update($request->only([
            'tse_assigned',
            'requesting_party',
            'department',
            'location'
        ]));

        return redirect()->back();
    }
}
