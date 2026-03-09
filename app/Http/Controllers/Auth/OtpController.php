<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Notifications\LoginOtpNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class OtpController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $key = 'login_otp_'.$user->id;

        // Don't resend OTP on every refresh
        if (! Cache::has($key)) {
            $this->sendOtp($user, $key);
        }

        return inertia('auth/otp', [
            'status' => 'OTP sent to your email.',
        ]);
    }

    public function resend(Request $request)
    {
        $user = $request->user();
        $key = 'login_otp_'.$user->id;

        // Force a new OTP
        Cache::forget($key);
        $this->sendOtp($user, $key);

        return back()->with('status', 'OTP resent to your email.');
    }

    public function verify(Request $request)
    {
        $request->validate([
            'otp' => ['required', 'digits:6'],
        ]);

        $user = $request->user();
        $key = 'login_otp_'.$user->id;

        $expected = Cache::get($key);

        if (! $expected || $expected !== $request->otp) {
            return back()->withErrors([
                'otp' => 'Invalid or expired OTP.',
            ]);
        }

<<<<<<< HEAD
        // OTP correct - clear cache and mark session as verified.
        Cache::forget($key);

        // Mark the session as OTP-verified for a short time window.
        // Store a UNIX timestamp to simplify comparisons in middleware.
        $request->session()->put('two_factor_verified_at', now()->timestamp);

        // Keep an explicit boolean for older code paths that may check it.
        $request->session()->put('otp_passed', true);

        // Regenerate session once to prevent fixation, preserving session data.
        $request->session()->regenerate();

        // Redirect to the intended URL (if any), otherwise fall back to dashboard
        return redirect()->intended(route('dashboard'));
    }

    private function sendOtp($user, string $key): void
    {
        $otp = (string) random_int(100000, 999999);

        Cache::put($key, $otp, now()->addMinutes(10));

        try {
            $user->notify(new LoginOtpNotification($otp));
        } catch (\Throwable $e) {
            report($e);
            abort(500, 'Mail sending failed. Check SMTP settings.');
        }
    }
}
