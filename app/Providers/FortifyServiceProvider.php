<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind the Fortify TwoFactor provider to our email OTP provider
        $this->app->singleton(\Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider::class, \App\Providers\EmailTwoFactorProvider::class);

        // Replace Fortify's RedirectsIfTwoFactorAuthenticatable with our email-OTP redirect
        $this->app->bind(\Laravel\Fortify\Contracts\RedirectsIfTwoFactorAuthenticatable::class, \App\Actions\RedirectIfEmailTwoFactorAuthenticatable::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
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

        Fortify::twoFactorChallengeView(function () {
            $userId = session('login.id');

            if ($userId) {
                $userModel = config('auth.providers.users.model');
                $user = $userModel::find($userId);

                if ($user) {
                    // Ensure user has a stored (encrypted) two_factor_secret so Fortify's
                    // TwoFactorLoginRequest can decrypt it without throwing an exception.
                    if (empty($user->two_factor_secret)) {
                        $secret = Fortify::currentEncrypter()->encrypt(\Illuminate\Support\Str::random(32));
                        $user->two_factor_secret = $secret;
                        $user->save();
                    }

                    // generate a 6-digit code
                    $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
                    $hash = hash('sha256', $code);
                    $expiresAt = now()->addMinutes(10);

                    \App\Models\EmailOtp::create([
                        'user_id' => $user->id,
                        'code_hash' => $hash,
                        'expires_at' => $expiresAt,
                    ]);

                    $user->notify(new \App\Notifications\EmailOtpNotification($code));
                }
            }

            return Inertia::render('auth/two-factor-challenge');
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
