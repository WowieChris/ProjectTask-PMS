<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Notifications\LoginOtpNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class OtpController extends Controller
{
    public function show(Request $request)
    {
        $this->sendOtp($request);

        return inertia('auth/otp', [
            'status' => 'OTP sent to your email.',
        ]);
    }

    public function resend(Request $request)
    {
        $this->sendOtp($request);

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

        if (!$expected || $expected !== $request->otp) {
            return back()->withErrors([
                'otp' => 'Invalid or expired OTP.',
            ]);
        }

        // OTP ok
        Cache::forget($key);
        $request->session()->put('otp_passed', true);

        return redirect()->route('dashboard');
    }

    // private function sendOtp(Request $request): void
    // {
    //     $user = $request->user();

    //     $otp = (string) random_int(100000, 999999);

    //     Cache::put('login_otp_' . $user->id, $otp, now()->addMinutes(10));

    //     $user->notify(new LoginOtpNotification($otp)); // ✅ this sends
    // }

    private function sendOtp(Request $request): void
        {
            $user = $request->user();
            $otp = (string) random_int(100000, 999999);

            Cache::put('login_otp_' . $user->id, $otp, now()->addMinutes(10));

            try {
                $user->notify(new LoginOtpNotification($otp));
            } catch (\Throwable $e) {
                report($e);
                // optional: throw a validation-like error
                abort(500, 'Mail sending failed. Check SMTP settings.');
            }
        }

}