<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\EARequest;

class EARequestController extends Controller
{
    // LIST REQUESTS
    public function index(Request $request)
    {
        $query = EARequest::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('full_name', 'like', "%{$request->search}%")
                  ->orWhere('request_id', 'like', "%{$request->search}%")
                  ->orWhere('request_title', 'like', "%{$request->search}%");
            });
        }

        if ($request->status && $request->status !== 'All Status') {
            $query->where('status', $request->status);
        }

        if ($request->type && $request->type !== 'All Types') {
            $query->where('request_type', $request->type);
        }

        if ($request->date) {
            $query->whereDate('date_received', $request->date);
        }

        $requests = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('EAMonitoring/Request/Index', [
            'requests' => $requests,
            'filters' => $request->only(['search', 'status', 'type', 'date']),
        ]);
    }

    // SHOW CREATE FORM
    public function create()
    {
        return Inertia::render('EAMonitoring/Request/Create');
    }

    // STORE NEW REQUEST
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'request_title' => 'required|string|max:255',
            'request_type' => 'required|string|max:100',
            'date_received' => 'required|date',
        ]);

        EARequest::create([
            'request_id' => 'REQ-' . str_pad(EARequest::count() + 1, 3, '0', STR_PAD_LEFT),
            'full_name' => $request->full_name,
            'department' => $request->department ?? 'N/A',
            'request_title' => $request->request_title,
            'request_type' => $request->request_type,
            'date_received' => $request->date_received,
            'srf_number' => $request->srf_number ?? '',
            'status' => $request->status ?? 'Pending',
        ]);

        return redirect()->route('EAMonitoring.request.index')
                         ->with('success', 'Request created successfully.');
    }

    // DELETE SINGLE REQUEST
    public function destroy($id)
    {
        EARequest::findOrFail($id)->delete();

        return redirect()->route('EAMonitoring.request.index')
                         ->with('success', 'Request deleted successfully.');
    }

    // BULK UPDATE STATUS
    public function bulkUpdate(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'status' => 'required|string',
        ]);

        EARequest::whereIn('id', $request->ids)
                 ->update(['status' => $request->status]);

        return redirect()->route('EAMonitoring.request.index')
                         ->with('success', 'Selected requests updated successfully.');
    }
}