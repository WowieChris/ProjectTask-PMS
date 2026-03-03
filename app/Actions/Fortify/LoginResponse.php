<?php

namespace App\Fortify;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        // after password login -> require OTP
        $request->session()->put('otp_passed', false);

        return redirect()->route('otp.show');
    }
}
