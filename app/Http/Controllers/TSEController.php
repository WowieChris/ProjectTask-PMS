<?php

namespace App\Http\Controllers;

use App\Models\TSEServiceOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TSEController extends Controller
{
    public function index()
    {
        return Inertia::render('TSE/Index', [
            'tickets' => \App\Models\TSEServiceOrder::all()
        ]);
    }

    public function store(Request $request)
    {
        TSEServiceOrder::create($request->all());
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $ticket = TSEServiceOrder::findOrFail($id);
        $ticket->update($request->all());
        return redirect()->back();
    }

    public function destroy($id)
    {
        TSEServiceOrder::findOrFail($id)->delete();
        return redirect()->back();
    }
}
