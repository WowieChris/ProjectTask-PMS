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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:user,admin',
            'designation' => 'nullable|string|max:255',
            'employee_id' => 'required|string|max:255',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'designation' => $request->designation,
            'employee_id' => $request->employee_id,
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'role' => 'required|string|in:user,admin',
            'designation' => 'nullable|string|max:255',
            'employee_id' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'designation' => $request->designation,
            'employee_id' => $request->employee_id,
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function updateInline(Request $request, User $user)
    {
        $field = $request->input('field');
        $value = $request->input('value');

        $validated = match ($field) {
            'designation' => $request->validate(['value' => 'nullable|string|max:255']),
            default => throw new \Exception('Invalid field'),
        };

        $user->update([$field => $value]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'user' => $user,
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);

        if (! is_array($ids) || count($ids) === 0) {
            return back()->with('error', 'No users selected.');
        }

        User::whereIn('id', $ids)->delete();

        return back()->with('success', 'Selected users deleted.');
    }
}
