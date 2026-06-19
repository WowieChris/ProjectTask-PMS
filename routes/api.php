<?php


use App\Http\Controllers\Api\GeocodingController;
use App\Http\Controllers\Api\GeoMapBranchController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PsgcController;

Route::post(
    '/geomap/geocode',
    [GeocodingController::class, 'geocode']
);

Route::post(
    '/geomap/reverse-geocode',
    [GeocodingController::class, 'reverse']
);

Route::apiResource(
    'geomap-branches',
    GeoMapBranchController::class
);


Route::prefix('psgc')->group(function () {
    Route::get('/all', [PsgcController::class, 'all']);
});

Route::get('/psgc-test', function () {
    return [
        'base_url' => config('services.psgc.base_url'),
        'version'  => config('services.psgc.version'),
        'token'    => config('services.psgc.token'),
    ];
});
