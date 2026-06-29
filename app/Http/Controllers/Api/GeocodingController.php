<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
// use App\Services\GeoapifyService;
use App\Services\NominatimService;
use Illuminate\Http\Request;

class GeocodingController extends Controller
{
    public function geocode(
        Request $request,
        NominatimService $nominatim
    ) {
        $request->validate([
            'address' => ['required', 'string']
        ]);

        $result = $nominatim->geocode(
            $request->address
        );

        return response()->json($result);
    }

    public function reverse(
        Request $request,
        NominatimService $nominatim
    ) {
        $request->validate([
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
        ]);

        $result = $nominatim->reverse(
            $request->latitude,
            $request->longitude
        );

        return response()->json($result);
    }
}
