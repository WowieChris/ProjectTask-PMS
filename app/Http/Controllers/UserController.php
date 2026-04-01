<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\Designation;

class UserController extends Controller
{
    public function index()
    {
        // $users = User::with('photo')->get();

        return Inertia::render('users/index', [
            'users' => User::with('photo')->orderBy('name')->get(),
            'designations' => Designation::orderBy('name')->get(['id', 'name', 'role']), // ← add this
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create', [
            'designations' => Designation::orderBy('name')->get(['id', 'name', 'role']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'designation_id' => 'required|exists:designations,id',
            'employee_id' => ['required', 'regex:/^\d{4}-\d{4,5}$/', 'unique:users,employee_id'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,

            // automatic default password
            'password' => Hash::make('password'),

            'role' => $request->role,
            'designation_id' => $request->designation_id,
            'employee_id' => $request->employee_id,

            // location removed from form
            'location' => null,

            'employment_status' => 'inactive',
            'must_change_password' => true,
        ]);

        event(new Registered($user));

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
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|string|in:user,admin',
            'designation_id' => 'required|exists:designations,id',
            'employee_id' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'district' => 'nullable|string|max:255',
            'employment_status' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'role' => $request->role,
            'designation_id' => $request->designation_id,
            'employee_id' => $request->employee_id,
            'location' => $request->location,
            'district' => $request->district,
            'employment_status' => $request->employment_status,
            'date_employed' => $request->date_employed,
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function updateInline(Request $request, User $user)
    {
        $field = $request->input('field');
        $value = $request->input('value');

        $validated = match ($field) {
            'designation_id' => $request->validate(['value' => 'nullable|exists:designations,id']),
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

    public function assignUserGroup(Request $request)
    {
        $request->validate([
            'senior_field_id' => 'required|exists:users,id',
            'user_group_id' => 'required|exists:user_groups,id',
        ]);

        $user = User::find($request->senior_field_id);
        $user->user_group_id = $request->user_group_id;
        $user->save();

        return back()->with('success', 'Assigned successfully');
    }
}
