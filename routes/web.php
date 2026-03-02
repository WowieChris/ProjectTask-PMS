<?php

use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Settings\ProfileController;

Route::get('/', function () {
    return Inertia::render('auth/login', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

/**
 * Authenticated routes
 */
Route::middleware(['auth'])->group(function () {

    // OTP routes
    Route::get('/otp', [OtpController::class, 'show'])->name('otp.show');
    Route::post('/otp/verify', [OtpController::class, 'verify'])->name('otp.verify');
    Route::post('/otp/resend', [OtpController::class, 'resend'])->name('otp.resend');

    // Protected after OTP
    Route::middleware(['otp.verified'])->group(function () {
        Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

        // users...
        Route::delete('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
        Route::patch('/users/{user}/inline-update', [UserController::class, 'updateInline'])->name('users.inline-update');
        Route::resource('users', UserController::class)->except(['show']);


        // routes/web.php

            Route::middleware(['auth'])->group(function () {
                Route::get('/settings/profile', [\App\Http\Controllers\Settings\ProfileController::class, 'edit'])
                    ->name('profile.edit');

                Route::patch('/settings/profile', [\App\Http\Controllers\Settings\ProfileController::class, 'update'])
                    ->name('profile.update');

                Route::delete('/settings/profile', [\App\Http\Controllers\Settings\ProfileController::class, 'destroy'])
                    ->name('profile.destroy');
            });

        require __DIR__ . '/settings.php';
    });
});
