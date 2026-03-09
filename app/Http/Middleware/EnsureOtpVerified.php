<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
<<<<<<< HEAD
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
=======
>>>>>>> origin/main

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

        // Time-limited OTP: check a timestamp stored in session. If the
        // timestamp is within the allowed window, allow access.
        $verifiedAt = $request->session()->get('two_factor_verified_at');

        // Timeout in minutes. Change this value as desired or read from config.
        $timeoutMinutes = config('fortify.two_factor_timeout', 5);

        if ($verifiedAt) {
            try {
                $ts = Carbon::createFromTimestamp($verifiedAt);

                if ($ts->greaterThanOrEqualTo(now()->subMinutes($timeoutMinutes))) {
                    return $next($request);
                }
            } catch (\Throwable $e) {
                // If timestamp parsing fails, fall through to require OTP.
            }
        }

        // Save intended and ensure a fresh OTP is issued when we redirect.
        $request->session()->put('url.intended', url()->full());

        try {
            // Clear any previously cached OTP so `OtpController::show` will
            // generate and send a new code when the user is redirected.
            Cache::forget('login_otp_'.$request->user()->id);
        } catch (\Throwable $e) {
            // Don't block access if cache clearing fails; log for debugging.
            Log::warning('Failed to clear OTP cache before redirect', ['user_id' => $request->user()->id, 'error' => $e->getMessage()]);
        }

        return redirect()->route('otp.show');
    }
}
