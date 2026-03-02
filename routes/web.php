<?php

use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

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
    Route::middleware(['otp.verified', 'verified'])->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

        // users...
        Route::delete('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
        Route::patch('/users/{user}/inline-update', [UserController::class, 'updateInline'])->name('users.inline-update');
        Route::resource('users', UserController::class)->except(['show']);

        require __DIR__.'/settings.php';
    });
});

Route::middleware(['auth'])->group(function () {
    // Photo upload routes
    Route::post('/user/photo/upload', [UserController::class, 'uploadPhoto'])->name('user.photo.upload');
    Route::get('/user/photos', [UserController::class, 'getPhotos'])->name('user.photos');
    Route::delete('/user/photo/{photo}', [UserController::class, 'deletePhoto'])->name('user.photo.delete');
    Route::post('/user/photo/{photo}/set-current', [UserController::class, 'setCurrentPhoto'])->name('user.photo.set-current');
});
