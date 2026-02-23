<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use App\Http\Controllers\Settings\TwoFactorMethodController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('users', \App\Http\Controllers\UserController::class)->middleware(['auth', 'verified']);

Route::get('verify', [TwoFactorAuthenticationController::class, 'verify'])->name('verify');

require __DIR__.'/settings.php';

use Illuminate\Http\Request;

// Allow resending a two-factor email for the current login session
Route::post('two-factor/resend', function (Request $request) {
    $user = \App\Models\User::find($request->session()->get('login.id'));

    if ($user) {
        event(new \Laravel\Fortify\Events\TwoFactorAuthenticationChallenged($user));
    }

    return back();
});


