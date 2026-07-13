<?php


use App\Http\Controllers\Api\GeocodingController;
use App\Http\Controllers\Api\GeoMapBranchController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PsgcController;
use App\Http\Controllers\OfficeAddressController;

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

Route::get('/offices', [OfficeAddressController::class, 'mapData']);
Route::patch('/offices/{level}/{id}/pin', [OfficeAddressController::class, 'movePin']);
Route::post('/api/offices/{level}', [OfficeAddressController::class, 'store']);