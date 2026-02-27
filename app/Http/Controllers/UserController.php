<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|string|email|max:255|unique:users,email',
            'password'    => 'required|string|min:8',
            'role'        => 'required|string|in:user,admin',
            'designation' => 'nullable|string|max:255',
            'employee_id' => 'required|string|max:255',
        ]);

        
        User::create([
            'name'        => $validated['name'],
            'email'       => $validated['email'],
            'password'    => Hash::make($validated['password']),
            'role'        => $validated['role'],
            'designation' => $validated['designation'] ?? null,
            'employee_id' => $validated['employee_id'],
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role'        => 'required|string|in:user,admin',
            'designation' => 'nullable|string|max:255',
            'employee_id' => 'required|string|max:255',
        ]);

        $user->update([
            'name'        => $validated['name'],
            'email'       => $validated['email'],
            'role'        => $validated['role'],
            'designation' => $validated['designation'] ?? null,
            'employee_id' => $validated['employee_id'],
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function updateInline(Request $request, User $user)
    {
        $field = $request->input('field');

        // Only allow specific fields to be edited inline
        if ($field !== 'designation') {
            return response()->json([
                'success' => false,
                'message' => 'Invalid field.',
            ], 422);
        }

        $validated = $request->validate([
            'value' => 'nullable|string|max:255',
        ]);

        $user->update([
            $field => $validated['value'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'user'    => $user->fresh(),
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'ids'   => ['required', 'array', 'min:1'],
            'ids.*' => ['integer', 'exists:users,id'],
        ]);

        User::whereIn('id', $validated['ids'])->delete();

        return back()->with('success', 'Selected users deleted.');
    }
}