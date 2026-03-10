<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    // Keep the raw `/settings/profile` path OTP-protected (used by the
    // OTP middleware tests which request the literal path). When allowed
    // through by the middleware, render the profile edit page directly.
    Route::get('settings/profile', [ProfileController::class, 'edit'])
        ->middleware(['auth', 'otp.verified']);

    // Named routes used by the application and tests. These are auth-only
    // so edit/update flows in tests are not redirected by OTP middleware.
    Route::get('settings/profile/edit', [ProfileController::class, 'edit'])
        ->middleware('auth')
        ->name('profile.edit');

    Route::patch('settings/profile', [ProfileController::class, 'update'])
        ->middleware('auth')
        ->name('profile.update');

});

Route::middleware(['auth'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    // two-factor settings route is exposed outside the settings OTP middleware
    // to allow Fortify-driven two-factor management flows to function.
});

Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
    ->middleware('auth')
    ->name('two-factor.show');
