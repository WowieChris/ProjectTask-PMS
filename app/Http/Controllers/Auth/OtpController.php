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
        $key = $this->otpKey($user->id);

        if (!Cache::has($key)) {
            $this->sendOtp($user, $key);
        }
        $otp = app()->environment('local')
            ? Cache::get($key . '_plain')
            : null;

        return inertia('auth/otp', [
            'status' => 'OTP sent to your email.',
            'otp_debug' => $otp,
        ]);
    }

    public function resend(Request $request)
    {
        $user = $request->user();

        $cooldownKey = $this->resendKey($user->id);

        // ⛔ Rate limit resend (60 sec)
        if (Cache::has($cooldownKey)) {
            return back()->withErrors([
                'otp' => 'Please wait before requesting another OTP.',
            ]);
        }

        Cache::put($cooldownKey, true, now()->addSeconds(60));

        $key = $this->otpKey($user->id);

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
        $otpKey = $this->otpKey($user->id);
        $attemptKey = $this->attemptKey($user->id);

        // 🔁 Track attempts (max 5)
        $attempts = Cache::increment($attemptKey);

        Cache::put($attemptKey, $attempts, now()->addMinutes(10));

        if ($attempts > 5) {
            Cache::forget($otpKey);

            return back()->withErrors([
                'otp' => 'Too many attempts. Request a new OTP.',
            ]);
        }

        $expectedHash = Cache::get($otpKey);

        // ✅ Check cache OTP
        if ($expectedHash && hash_equals($expectedHash, hash('sha256', $request->otp))) {
            // success
        } else {
            // 🔁 Fallback DB check (Fortify-style)
            try {
                $otpRecord = \App\Models\EmailOtp::where('user_id', $user->id)
                    ->where('used', false)
                    ->where('expires_at', '>', now())
                    ->orderByDesc('created_at')
                    ->first();

                if (
                    !$otpRecord ||
                    !hash_equals($otpRecord->code_hash, hash('sha256', $request->otp))
                ) {
                    return back()->withErrors([
                        'otp' => 'Invalid or expired OTP.',
                    ]);
                }

                $otpRecord->update(['used' => true]);
            } catch (\Throwable $e) {
                return back()->withErrors([
                    'otp' => 'Invalid or expired OTP.',
                ]);
            }
        }

        // ✅ SUCCESS → cleanup
        Cache::forget($otpKey);
        Cache::forget($attemptKey);

        // 🔐 Regenerate session FIRST
        $request->session()->regenerate();

        // ✅ Mark verified
        $request->session()->put('two_factor_verified_at', now()->timestamp);
        $request->session()->put('otp_passed', true);

        // ✅ Settings bypass fix
        $intendedUrl = $request->session()->get('url.intended', '');

        if (str_contains($intendedUrl, '/settings')) {
            $request->session()->put('settings_otp_verified_at', now()->timestamp);
        }

        return redirect()->intended(route('dashboard'));
    }

    private function sendOtp($user, string $key): void
    {
        $otp = (string) random_int(100000, 999999);

        // Store hashed (secure)
        Cache::put($key, hash('sha256', $otp), now()->addMinutes(10));

        // Store plain ONLY for local debug
        if (app()->environment('local')) {
            Cache::put($key . '_plain', $otp, now()->addMinutes(10));
        }

        try {
            $user->notify(new LoginOtpNotification($otp));
        } catch (\Throwable $e) {
            report($e);
            abort(500, 'Mail sending failed. Check SMTP settings.');
        }
    }

    // 🔑 Key helpers (clean + reusable)
    private function otpKey($userId): string
    {
        return 'login_otp_' . $userId;
    }

    private function attemptKey($userId): string
    {
        return 'otp_attempts_' . $userId;
    }

    private function resendKey($userId): string
    {
        return 'otp_resend_' . $userId;
    }
}
