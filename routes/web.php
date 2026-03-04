<?php

use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\PasswordSetupController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\UserGroupController;

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
    Route::get('password-setup', [PasswordSetupController::class, 'show'])->name('password.setup');
    Route::post('password-setup', [PasswordSetupController::class, 'update'])->name('password.setup.update');
            //District and Division routes
    Route::get('/districts', [DistrictController::class, 'index'])->name('districts.index');
    Route::post('/districts', [DistrictController::class, 'store'])->name('districts.store');
    Route::delete('/districts/{district}', [DistrictController::class, 'destroy'])->name('districts.destroy');

    Route::get('/divisions', [DivisionController::class, 'index'])->name('divisions.index');
    Route::post('/divisions', [DivisionController::class, 'store'])->name('divisions.store');
    Route::delete('/divisions/{division}', [DivisionController::class, 'destroy'])->name('divisions.destroy');

    Route::get('/user-groups', [UserGroupController::class, 'index'])->name('user-groups.index');
    Route::post('/user-groups', [UserGroupController::class, 'store'])->name('user-groups.store');
    Route::delete('/user-groups/{userGroup}', [UserGroupController::class, 'destroy'])->name('user-groups.destroy');

    
});
