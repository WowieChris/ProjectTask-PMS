<?php

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

Route::delete('/users/bulk-delete', [UserController::class, 'bulkDelete'])
    ->name('users.bulk-delete');

Route::patch('/users/{user}/inline-update', [UserController::class, 'updateInline'])
    ->name('users.inline-update');

Route::resource('users', \App\Http\Controllers\UserController::class)->middleware(['auth', 'verified']);

// Route::delete('/users/bulk-delete', [UserController::class, 'bulkDelete'])
//     ->name('users.bulk-delete');

// Route::resource('users', UserController::class);
require __DIR__.'/settings.php';
