<?php

namespace App\Providers;

use App\Fortify\LoginResponse as OtpLoginResponse;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(LoginResponse::class, OtpLoginResponse::class);
    }

    public function boot(): void
    {
        Fortify::loginView(function () {
            return inertia('auth/login');
        });
    }
}
