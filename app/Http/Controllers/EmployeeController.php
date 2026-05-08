<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use App\Models\Designation;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = User::with([
            'designation:id,name',
            'branch:id,name',
            'department:id,name',
            'photo'
        ])->latest()->get();
        $designation = Designation::latest()->get();

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'designation' => $designation,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Employee/View');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Employee/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    // CUSTOM ROUTES

    public function archive()
    {
        return Inertia::render('Employee/Archive');
    }

    public function import()
    {
        //
    }

    public function transfer()
    {
        //
    }
}
