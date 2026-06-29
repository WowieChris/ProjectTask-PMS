<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NominatimService
{
    public function geocode(string $address): ?array
    {
        $response = Http::withOptions([
            'verify' => false,
        ])->withHeaders([
            'User-Agent' => 'ProjectTask-PMS'
        ])->get(
            'https://nominatim.openstreetmap.org/search',
            [
                'q' => $address,
                'format' => 'jsonv2',
                'limit' => 1,
                'addressdetails' => 1,
            ]
        );

        if (!$response->successful()) {
            return null;
        }

        $result = $response->json();

        if (empty($result)) {
            return null;
        }

        return [
            'address' => $result[0]['display_name'],
            'latitude' => (float)$result[0]['lat'],
            'longitude' => (float)$result[0]['lon'],
        ];
    }

    public function reverse(
        float $lat,
        float $lng
    ): ?array {
        $response = Http::withOptions([
            'verify' => false,
        ])->withHeaders([
            'User-Agent' => 'ProjectTask-PMS'
        ])->get(
            'https://nominatim.openstreetmap.org/reverse',
            [
                'lat' => $lat,
                'lon' => $lng,
                'format' => 'jsonv2',
                'addressdetails' => 1,
            ]
        );

        if (!$response->successful()) {
            return null;
        }

        $result = $response->json();

        return [
            'address' => $result['display_name'] ?? '',
            'latitude' => (float)$result['lat'],
            'longitude' => (float)$result['lon'],
        ];
    }
}
