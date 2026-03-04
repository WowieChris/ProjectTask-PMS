<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordSetupRequest;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PasswordSetupController extends Controller
{
    public function show()
    {
        return Inertia::render('auth/password-setup');
    }

    public function update(PasswordSetupRequest $request)
    {
        $user = $request->user();
        $user->password = Hash::make($request->password);
        $user->must_change_password = false;
        if (is_null($user->email_verified_at)) {
            $user->email_verified_at = now();
        }
        $user->save();

        return redirect()->route('Dashboard');
    }
}
