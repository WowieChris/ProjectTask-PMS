<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        // Ensure otp_passed is false so EnsureOtpVerified redirects to /otp.
        $request->session()->put('otp_passed', false);

        // Redirect to dashboard; EnsureOtpVerified middleware will intercept
        // and redirect to /otp for the single OTP verification step.
        return redirect()->intended(route('dashboard'));
    }
}
