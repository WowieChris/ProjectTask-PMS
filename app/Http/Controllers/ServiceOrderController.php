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

        return Inertia::render('service-order/index', [
            'orders' => $orders
        ]);
    }
}
