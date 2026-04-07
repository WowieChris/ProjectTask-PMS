<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\PasswordSetupController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\DesignationsController;
use App\Http\Controllers\locationController;
use App\Http\Controllers\MyLocationController;
use App\Http\Controllers\EngineerAssignmentController;
use App\Http\Controllers\SeniorFieldAssignmentController;
use App\Http\Controllers\NavigationController;


Route::get('/', function () {
    return Inertia::render('auth/login', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Inertia confirm-password routes (override Fortify default views)
Route::get('/user/confirm-password', function (Request $request) {
    return Inertia::render('auth/confirm-password');
})->middleware(['auth'])->name('password.confirm');

Route::post('/user/confirm-password', function (Request $request) {
    $request->validate([
        'password' => ['required', 'current_password'],
    ]);

    $request->session()->put('auth.password_confirmed_at', Date::now()->unix());

    return redirect()->intended('/');
})->middleware(['auth'])->name('password.confirm.store');

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
        Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

        // users...
        Route::delete('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
        Route::patch('/users/{user}/inline-update', [UserController::class, 'updateInline'])->name('users.inline-update');
        Route::resource('users', UserController::class)->except(['show']);

        require __DIR__ . '/settings.php';
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
    //District, Division, Area and Districts routes
    Route::middleware(['auth'])->group(function () {
        //location controller
        Route::get('/locations', [LocationController::class, 'index']);
        //District routes
        Route::get('/districts', [DistrictController::class, 'index'])->name('districts.index');
        Route::post('/districts', [DistrictController::class, 'store']);
        Route::delete('/districts/{district}', [DistrictController::class, 'destroy']);
        Route::resource('districts', DistrictController::class);

        //Division routes
        Route::resource('divisions', DivisionController::class);
        Route::post('/divisions', [DivisionController::class, 'store']);
        Route::delete('/divisions/{division}', [DivisionController::class, 'destroy']);
        //Area routes
        Route::get('/areas', [AreaController::class, 'index']);
        Route::get('/areas/{area}', [AreaController::class, 'show']);
        Route::get('/areas/{area}/divisions/{division}', [AreaController::class, 'division']);
        Route::get('/areas', [AreaController::class, 'index'])->name('areas.index');
        Route::post('/areas', [AreaController::class, 'store'])->name('areas.store');
        Route::delete('/areas/{area}', [AreaController::class, 'destroy'])->name('areas.destroy');

        //Branch routes

        Route::get('/branches', [BranchController::class, 'index'])->name('branches.index');
        Route::get('/areas/{area}/branches', [BranchController::class, 'index']);
        Route::post('/branches', [BranchController::class, 'store']);
        Route::delete('/branches/{branch}', [BranchController::class, 'destroy']);
    });
    Route::middleware(['auth'])->group(function () {
        // User Group routes
        Route::get('/user-groups', [UserGroupController::class, 'index'])->name('user-groups.index');
        Route::get('/user-groups/{userGroup}', [UserGroupController::class, 'show'])->name('user-groups.show');
        Route::post('/user-groups', [UserGroupController::class, 'store'])->name('user-groups.store');
        Route::delete('/user-groups/{userGroup}', [UserGroupController::class, 'destroy'])->name('user-groups.destroy');
        Route::get('/user-groups', [UserGroupController::class, 'index'])->middleware('auth');
    });
    //UserGroup
    Route::middleware(['auth'])->group(function () {


        Route::post('/user-groups', [UserGroupController::class, 'store'])->name('user-groups.store');
        Route::delete('/user-groups/{userGroup}', [UserGroupController::class, 'destroy'])->name('user-groups.destroy');
    });



    Route::middleware(['auth'])->group(function () {
        Route::resource('designations', DesignationsController::class);
    });

    //Service Order/
    Route::prefix('service-order')->group(function () {

        Route::get('/field-eng', function () {
            return Inertia::render('Service-Order/Field-Eng/Index');
        })->name('service-order.field');

        Route::get('/technical-support-eng', function () {
            return Inertia::render('Service-Order/Technical-Support-Eng/Index');
        })->name('service-order.tech');

        Route::get('/infrastructure-eng', function () {
            return Inertia::render('Service-Order/Infrastructure-Eng/Index');
        })->name('service-order.infra');
    });
    //My Loctions
    Route::middleware(['auth'])->group(function () {
        Route::get('/mylocation', [MyLocationController::class, 'index'])
            ->middleware('auth')
            ->name('mylocation');
    });
    //Config FIle
    //NAVIGATION CONTROLLER
    // Route::patch('/navigation/move', [NavigationController::class, 'move']);
    //FIELD ENG CONTROLLER
    Route::get('/ConfigFiles/Field-Eng', [EngineerAssignmentController::class, 'Index']);
    Route::post('/ConfigFiles/Field-Eng', [EngineerAssignmentController::class, 'store']);
    //SENIOR FIELD ENG CONTROLLER
    Route::get('/ConfigFiles/SFE', [SeniorFieldAssignmentController::class, 'index']);
    Route::post('/ConfigFiles/SFE', [SeniorFieldAssignmentController::class, 'store']);

    //NAVIGATION INDEX
    Route::middleware(['auth'])->group(function () {
        //NAVIGATION index
        Route::get('/ConfigFiles/Navigation', [NavigationController::class, 'index']);
    });
    //EA Monitoring
    Route::prefix('EAMonitoring')->group(function () {  

        Route::get('/Request', function () {
            return Inertia::render('EAMonitoring/Request/Index');
    })->name('EAMonitoring.request');
    });
});
