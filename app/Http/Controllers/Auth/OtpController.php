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

        // OTP correct
        Cache::forget($key);

        // ✅ session-based OTP verification (no database)
        $request->session()->put('otp_passed', true);
        $request->session()->regenerate();

        return redirect()->route('dashboard');
    }

    private function sendOtp($user, string $key): void
    {
        $otp = (string) random_int(100000, 999999);

        Cache::put($key, $otp, now()->addMinutes(10));

        // Log OTP generation for debugging (temporary)
        Log::info('OTP generated for user', ['user_id' => $user->id, 'otp' => $otp]);

        try {
            $user->notify(new LoginOtpNotification($otp));
            Log::info('OTP notification invoked', ['user_id' => $user->id]);
        } catch (\Throwable $e) {
            report($e);
            Log::error('OTP notify failed', ['user_id' => $user->id, 'error' => $e->getMessage()]);
            abort(500, 'Mail sending failed. Check SMTP settings.');
        }
    }
}
