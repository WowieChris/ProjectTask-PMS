<?php


use App\Http\Controllers\Api\GeocodingController;
use App\Http\Controllers\Api\GeoMapBranchController;
use Illuminate\Support\Facades\Route;

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
