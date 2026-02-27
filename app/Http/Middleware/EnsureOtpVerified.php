<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureOtpVerified
{
    public function handle(Request $request, Closure $next)
    {
        // Let auth middleware handle guests
        if (! $request->user()) {
            return $next($request);
        }

        // Allow OTP routes always
        if ($request->routeIs('otp.*')) {
            // If already verified in session, skip OTP page
            if ($request->session()->get('otp_passed') === true) {
                return redirect()->route('dashboard');
            }
            return $next($request);
        }

        // Optional: allow logout without OTP
        if ($request->routeIs('logout')) {
            return $next($request);
        }

        // Block access until OTP is passed in this session
        if ($request->session()->get('otp_passed') !== true) {
            return redirect()->route('otp.show');
        }

        return $next($request);
    }
}