<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use App\Models\User;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Laravel\Fortify\Events\TwoFactorAuthenticationChallenged;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider as TwoFactorAuthenticationProviderContract;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();

        // Bind a custom two factor provider that supports email codes
        $this->app->singleton(TwoFactorAuthenticationProviderContract::class, function ($app) {
            $default = new \Laravel\Fortify\TwoFactorAuthenticationProvider(
                $app->make(\PragmaRX\Google2FA\Google2FA::class),
                $app['cache.store'] ?? null
            );

            return new \App\Providers\EmailTwoFactorProvider($default, $app['cache.store'] ?? null);
        });

        // Override Fortify's redirect action to also support email-based challenges
        $this->app->singleton(\Laravel\Fortify\Contracts\RedirectsIfTwoFactorAuthenticatable::class, function ($app) {
            return $app->make(\App\Actions\RedirectIfTwoFactorAuthenticatable::class);
        });

        // Send an email code when Fortify triggers the two-factor challenge
        Event::listen(TwoFactorAuthenticationChallenged::class, function ($event) {
            $user = $event->user;

            try {
                $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

                Cache::put('fortify.email_2fa.'.$user->getKey(), $code, now()->addMinutes(10));

                    Log::debug('email 2fa generated', ['user' => $user->getKey(), 'code' => $code]);

                Mail::to($user->email)->send(new \App\Mail\TwoFactorCode($user, $code));
            } catch (\Throwable $e) {
                    Log::error('failed to send email 2fa', ['exception' => $e->getMessage()]);
                    // swallowing any exceptions to avoid breaking the login flow
            }
        });
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(fn () => Inertia::render('auth/register'));

        Fortify::twoFactorChallengeView(function (Request $request) {
            $user = User::find($request->session()->get('login.id'));

            return Inertia::render('auth/two-factor-challenge', [
                'twoFactorMethod' => $user?->two_factor_method ?? null,
                'email' => $user?->email ?? null,
            ]);
        });

        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }
}
