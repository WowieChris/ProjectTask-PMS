<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

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
            return $next($request);
        }

        // Optional: allow logout without OTP
        if ($request->routeIs('logout')) {
            return $next($request);
        }

        $user = $request->user();

        // If accessing settings (by route name or URI), require a fresh OTP.
        // Allow through only if OTP was verified specifically for a settings
        // redirect (within the last 30 minutes), so login OTP never bypasses
        // this prompt.
        if ($request->routeIs('settings.*') || $request->is('settings*')) {
            $settingsVerifiedAt = $request->session()->get('settings_otp_verified_at');

            if ($settingsVerifiedAt && (now()->timestamp - $settingsVerifiedAt) < 1800) {
                return $next($request);
            }

            $request->session()->put('url.intended', url()->full());
            try {
                Cache::forget('login_otp_'.$user->id);
            } catch (\Throwable $e) {
                Log::warning('Failed to clear OTP cache before redirect to settings', ['user_id' => $user->id, 'error' => $e->getMessage()]);
            }
            $request->session()->put('otp_passed', false);
            $request->session()->forget('settings_otp_verified_at');

            return redirect()->route('otp.show');
        }

        // For all other routes, only require OTP if the session hasn't been
        // marked as OTP-verified. Do not re-prompt on a time-based timeout.
        if ($request->session()->get('otp_passed') === true) {
            return $next($request);
        }

        // Not verified in this session: save intended URL, clear cached OTP
        // so a fresh code will be issued, and redirect to the OTP page.
        $request->session()->put('url.intended', url()->full());
        try {
            Cache::forget('login_otp_'.$user->id);
        } catch (\Throwable $e) {
            Log::warning('Failed to clear OTP cache before redirect', ['user_id' => $user->id, 'error' => $e->getMessage()]);
        }

        return redirect()->route('otp.show');
    }
}
