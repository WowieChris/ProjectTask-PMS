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
        $key = 'login_otp_' . $user->id;

        // Don't resend OTP on every refresh
        if (! Cache::has($key)) {
            $this->sendOtp($user, $key);
        }
        $otp = Cache::get($key);
        return inertia('auth/otp', [
            'status' => 'OTP sent to your email.',
            'otp_debug' => $otp,
        ]);
    }

    public function resend(Request $request)
    {
        $user = $request->user();
        $key = 'login_otp_' . $user->id;

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
        $key = 'login_otp_' . $user->id;

        $expected = Cache::get($key);

        // First check cache-based login OTP (used by the login/settings flow)
        if ($expected && $expected === $request->otp) {
            // matched cache OTP
        } else {
            // Fallback: check database-backed EmailOtp entries (Fortify flow)
            try {
                $otpRecord = \App\Models\EmailOtp::where('user_id', $user->id)
                    ->where('used', false)
                    ->where('expires_at', '>', now())
                    ->orderByDesc('created_at')
                    ->first();

                if (! $otpRecord || ! hash_equals($otpRecord->code_hash, hash('sha256', $request->otp))) {
                    return back()->withErrors([
                        'otp' => 'Invalid or expired OTP.',
                    ]);
                }

                // mark DB OTP as used
                $otpRecord->used = true;
                $otpRecord->save();
            } catch (\Throwable $e) {
                // On any error, return a generic invalid/expired message
                return back()->withErrors([
                    'otp' => 'Invalid or expired OTP.',
                ]);
            }
        }

        // OTP correct - clear cache and mark session as verified.
        Cache::forget($key);

        // Mark the session as OTP-verified for a short time window.
        // Store a UNIX timestamp to simplify comparisons in middleware.
        $request->session()->put('two_factor_verified_at', now()->timestamp);

        // Keep an explicit boolean for older code paths that may check it.
        $request->session()->put('otp_passed', true);

        // If the user was redirected here from a settings page, mark settings
        // as OTP-verified so the middleware lets them through without looping.
        $intendedUrl = $request->session()->get('url.intended', '');
        if (str_contains($intendedUrl, '/settings')) {
            $request->session()->put('settings_otp_verified_at', now()->timestamp);
        }

        // Regenerate session once to prevent fixation, preserving session data.
        $request->session()->regenerate();

        // Redirect to the intended URL (if any), otherwise fall back to dashboard
        return redirect()->intended(route('dashboard'));
    }

    private function sendOtp($user, string $key): void
    {
        $otp = (string) random_int(100000, 999999);

        Cache::put($key, $otp, now()->addMinutes(10));

        Log::info('Generated OTP: ' . $otp);

        try {
            $user->notify(new LoginOtpNotification($otp));
        } catch (\Throwable $e) {
            report($e);
            abort(500, 'Mail sending failed. Check SMTP settings.');
        }
    }
}
