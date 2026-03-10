<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        // after password login -> require OTP/two-factor challenge
        $request->session()->put('otp_passed', false);

        // Also store the login id so the two-factor challenge can locate the
        // user (tests expect this session key to be present).
        if ($request->user()) {
            $request->session()->put('login.id', $request->user()->getKey());
            $request->session()->put('login.remember', $request->boolean('remember'));
        }

        // Use the `two-factor.login` named route so tests and redirects are consistent.
        return redirect()->route('two-factor.login');
    }
}
