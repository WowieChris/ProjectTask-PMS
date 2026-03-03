<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForcePasswordChange
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && $request->user()->must_change_password) {
            if ($request->routeIs('password.setup') || $request->routeIs('password.setup.update') || $request->routeIs('logout')) {
                return $next($request);
            }

            return redirect()->route('password.setup');
        }

        return $next($request);
    }
}
