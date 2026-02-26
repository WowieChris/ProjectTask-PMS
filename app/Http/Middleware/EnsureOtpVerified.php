<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureOtpVerified
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user && is_null($user->otp_verified_at) && !$request->routeIs('otp.*')) {
            return redirect()->route('otp.show');
        }

        return $next($request);
    }
}