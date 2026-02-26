<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
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

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('guest')->group(function () {
    // Let Fortify handle POST /login (recommended)
    // Remove your custom POST /login route if you haven't implemented store()
    // Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/otp', [OtpController::class, 'show'])->name('otp.show');
    Route::post('/otp/verify', [OtpController::class, 'verify'])->name('otp.verify');
    Route::post('/otp/resend', [OtpController::class, 'resend'])->name('otp.resend');
});

require __DIR__.'/settings.php';