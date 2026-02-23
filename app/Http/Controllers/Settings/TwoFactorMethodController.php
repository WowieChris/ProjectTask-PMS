<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class TwoFactorMethodController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['method' => 'required|in:email,totp']);

        $user = $request->user();
        $method = $request->input('method');

        // If switching to email, we won't require a TOTP secret.
        $user->two_factor_method = $method === 'totp' ? 'totp' : 'email';
        $user->save();

        return back();
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        // Clear chosen method
        $user->two_factor_method = null;
        $user->save();

        // Clear any cached email codes
        Cache::forget('fortify.email_2fa.'.$user->getKey());

        return back();
    }
}
