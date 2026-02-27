<?php

use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('auth/login', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

/**
 * Email verification routes
 */
Route::get('/email/verify', function () {
    return Inertia::render('auth/verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect()->route('dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

/**
 * Authenticated routes
 */
Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->middleware('verified')->name('dashboard');

    // OTP
    Route::get('/otp', [OtpController::class, 'show'])->name('otp.show');
    Route::post('/otp/verify', [OtpController::class, 'verify'])->name('otp.verify');
    Route::post('/otp/resend', [OtpController::class, 'resend'])->name('otp.resend');

    /**
     * Users
     * ✅ Choose ONE:
     * 1) If users pages should require verified email, keep ->middleware('verified')
     * 2) If not, remove ->middleware('verified')
     */
    Route::middleware('verified')->group(function () {
        Route::delete('/users/bulk-delete', [UserController::class, 'bulkDelete'])
            ->name('users.bulk-delete');

        Route::patch('/users/{user}/inline-update', [UserController::class, 'updateInline'])
            ->name('users.inline-update');

        Route::resource('users', UserController::class)->except(['show']);
    });

    // Settings routes
    require __DIR__ . '/settings.php';
});