<?php

namespace App\Http\Controllers;

use  App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\AssetDashboardController;
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
use App\Http\Controllers\EARequestController;
use App\Http\Controllers\EAHVAController;
use App\Http\Controllers\ScheduledTransferController;
use App\Http\Controllers\AssetCategoryController;
use App\Http\Controllers\AssetAssignmentController;
use App\Http\Controllers\AssetTransferController;
use App\Http\Controllers\Api\GeocodingController;
use App\Http\Controllers\Api\GeoMapBranchController;

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

//GEO MAP

// Route::get('/test-geocode', function () {

//     return app(
//         \App\Services\NominatimService::class
//     )->geocode(
//         'SM North EDSA'
//     );
// });

Route::middleware(['auth'])->group(function () {

    Route::get('/GeoMap', function () {
        return Inertia::render('GeoMap/Index');
    })->middleware('auth');

    Route::post('/geomap/geocode', [
        GeocodingController::class,
        'geocode'
    ]);

    Route::post('/geomap/reverse-geocode', [
        GeocodingController::class,
        'reverse'
    ]);

    Route::apiResource(
        'geomap-branches',
        GeoMapBranchController::class

    );
});

Route::middleware(['auth'])->group(
    function () {
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
            Route::post('/districts', [DistrictController::class, 'update']);

            Route::delete('/districts/{district}', [DistrictController::class, 'destroy']);
            Route::resource('districts', DistrictController::class);

            //Division routes
            Route::resource('divisions', DivisionController::class);
            Route::post('/divisions', [DivisionController::class, 'store']);
            Route::post('/divisions', [DivisionController::class, 'update']);
            Route::delete('/divisions/{division}', [DivisionController::class, 'destroy']);
            //Area routes
            Route::prefix('areas')->group(function () {

                Route::get('/', [AreaController::class, 'index'])
                    ->name('areas.index');

                Route::post('/', [AreaController::class, 'store'])
                    ->name('areas.store');

                Route::get('/{area}', [AreaController::class, 'show'])
                    ->name('areas.show');

                Route::put('/{area}', [AreaController::class, 'update'])
                    ->name('areas.update');

                Route::delete('/{area}', [AreaController::class, 'destroy'])
                    ->name('areas.destroy');

                Route::get('/{area}/divisions/{division}', [AreaController::class, 'division']);
            });

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

        //Transfer Logs 
        Route::get('/navigation/logs', [NavigationController::class, 'logs']);
        Route::get('/navigation/EngineerTransferLogs', [NavigationController::class, 'engineerTransferLogs'])
            ->name('navigation.engineer-transfer-logs');

        Route::post('/scheduled-location-moves', [ScheduledLocationMoveController::class, 'store'])
            ->name('scheduled-location-moves.store');

        Route::post('/scheduled-location-moves/{scheduledLocationMove}/apply', [ScheduledLocationMoveController::class, 'apply'])
            ->name('scheduled-location-moves.apply');

        Route::post('/scheduled-location-moves/{scheduledLocationMove}/cancel', [ScheduledLocationMoveController::class, 'cancel'])
            ->name('scheduled-location-moves.cancel');
        // ✅ Specific route FIRST
        Route::post('/ConfigFiles/Field-Eng/area-override', [EngineerAssignmentController::class, 'saveAreaOverride']);

        // General route AFTER
        Route::post('/ConfigFiles/Field-Eng', [EngineerAssignmentController::class, 'store']);

        //TreeNodeMove  
        Route::patch('/navigation/move', [NavigationController::class, 'move']);
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
            Route::post('/ConfigFiles/Navigation', [NavigationController::class, 'store']);
            Route::post('/seniorfieldassignment', [NavigationController::class, 'assignSeniorFieldGroup']);
        });
        //EA Monitoring
        Route::prefix('EAMonitoring')->name('EAMonitoring.')->group(function () {
            Route::get('/Request',                    [EARequestController::class, 'index'])->name('request.index');
            Route::get('/Request/create',             [EARequestController::class, 'create'])->name('request.create');
            Route::post('/Request',                   [EARequestController::class, 'store'])->name('request.store');
            Route::get('/Request/{id}',               [EARequestController::class, 'show'])->name('request.show');
            Route::get('/Request/{id}/edit',          [EARequestController::class, 'edit'])->name('request.edit');
            Route::put('/Request/{id}',               [EARequestController::class, 'update'])->name('request.update');
            Route::delete('/Request/{id}',            [EARequestController::class, 'destroy'])->name('request.destroy');
            Route::post('/Request/bulk-update',       [EARequestController::class, 'bulkUpdate'])->name('request.bulk-update');
        });
        Route::prefix('EAMonitoring/HVA')->name('EAMonitoring.hva.')->group(function () {

            Route::get('/', [EAHVAController::class, 'index'])->name('index');
            Route::post('/', [EAHVAController::class, 'store'])->name('store');
            Route::delete('/{id}', [EAHVAController::class, 'destroy'])->name('destroy');
        });



        //Route::post('/assign-senior-field-usergroup', [UserController::class, 'assignUserGroup']);
        //scheduled engineer transfers
        Route::prefix('ConfigFiles/Field-Eng')->middleware(['auth'])->group(function () {

            // List scheduled transfers for a district (AJAX / Inertia)
            Route::get('/scheduled',           [ScheduledTransferController::class, 'index'])->name('scheduled-transfers.index');

            // Create a new scheduled transfer
            Route::post('/scheduled',          [ScheduledTransferController::class, 'store'])->name('scheduled-transfers.store');

            // Manually apply a pending transfer
            Route::post('/scheduled/{scheduledTransfer}/apply',  [ScheduledTransferController::class, 'apply'])->name('scheduled-transfers.apply');

            // Cancel a pending transfer
            Route::post('/scheduled/{scheduledTransfer}/cancel', [ScheduledTransferController::class, 'cancel'])->name('scheduled-transfers.cancel');
        });
        Route::middleware(['auth'])->group(function () {

            // Create a scheduled transfer (called from the confirm modal)
            Route::post('/ConfigFiles/Field-Eng/scheduled', [ScheduledTransferController::class, 'store'])
                ->name('scheduled-transfers.store');

            // Manually apply a pending transfer (called from the pending panel)
            Route::post('/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/apply', [ScheduledTransferController::class, 'apply'])
                ->name('scheduled-transfers.apply');

            // Cancel a pending transfer
            Route::post('/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/cancel', [ScheduledTransferController::class, 'cancel'])
                ->name('scheduled-transfers.cancel');
        });
    }



);

//AssetManagement  

Route::prefix('asset-management')
    ->middleware(['auth'])
    ->group(function () {

        Route::resource('assets', AssetController::class, [
            'only' => ['index']
        ]);

        Route::get('/dashboard', [AssetDashboardController::class, 'index']);

        Route::resource('asset-categories', AssetCategoryController::class);

        Route::resource('asset-assignments', AssetAssignmentController::class);

        Route::resource('asset-transfers', AssetTransferController::class);

        Route::resource('asset-maintenance', AssetMaintenanceController::class);

        Route::resource('asset-logs', AssetLogController::class)
            ->only(['index']);
    });

//Employees
Route::resource('employees', EmployeeController::class);

Route::prefix('employees')->group(function () {

    Route::get('/archive', [EmployeeController::class, 'archive'])
        ->name('employees.archive');

    Route::post('/import', [EmployeeController::class, 'import'])
        ->name('employees.import');

    Route::post('/transfer', [EmployeeController::class, 'transfer'])
        ->name('employees.transfer');
});
