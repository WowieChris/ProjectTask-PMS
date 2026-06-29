<?php

namespace App\Http\Controllers;

use App\Services\PsgcService;
use Illuminate\Http\Request;

class PsgcController extends Controller
{
    public function regions(PsgcService $psgc)
    {
        return response()->json(['data' => $psgc->regions()]);
    }

    public function provinces(Request $request, PsgcService $psgc)
    {
        $regionCode = $request->query('region_code');
        $data = $psgc->provinces();

        if ($regionCode) {
            $data = array_values(array_filter($data, function ($item) use ($regionCode) {
                return ($item['regionCode'] ?? null) === $regionCode;
            }));
        }

        return response()->json(['data' => $data]);
    }

    public function municipalities(Request $request, PsgcService $psgc)
    {
        $provinceCode = $request->query('province_code');
        $data = $psgc->municipalities();

        if ($provinceCode) {
            $data = array_values(array_filter($data, function ($item) use ($provinceCode) {
                return ($item['provinceCode'] ?? null) === $provinceCode;
            }));
        }

        return response()->json(['data' => $data]);
    }

    public function barangays(Request $request, PsgcService $psgc)
    {
        $municipalityCode = $request->query('municipality_code');
        $data = $psgc->barangays();

        if ($municipalityCode) {
            $data = array_values(array_filter($data, function ($item) use ($municipalityCode) {
                return ($item['municipalityCode'] ?? null) === $municipalityCode;
            }));
        }

        return response()->json(['data' => $data]);
    }
}
