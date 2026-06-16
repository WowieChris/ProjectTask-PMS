<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeoapifyService
{
    protected string $baseUrl = 'https://api.geoapify.com/v1';

    public function geocode(string $address): ?array
    {
        $response = Http::get(
            "{$this->baseUrl}/geocode/search",
            [
                'text' => $address,
                'apiKey' => env('GEOAPIFY_KEY')
            ]
        );

        if (!$response->successful()) {
            return null;
        }

        $feature = $response->json('features.0');

        if (!$feature) {
            return null;
        }

        return [
            'address' => $feature['properties']['formatted'] ?? '',
            'latitude' => $feature['properties']['lat'],
            'longitude' => $feature['properties']['lon'],
        ];
    }

    public function reverse(float $lat, float $lng): ?array
    {
        $response = Http::get(
            "{$this->baseUrl}/geocode/reverse",
            [
                'lat' => $lat,
                'lon' => $lng,
                'apiKey' => env('GEOAPIFY_KEY')
            ]
        );

        if (!$response->successful()) {
            return null;
        }

        $feature = $response->json('features.0');

        if (!$feature) {
            return null;
        }

        return [
            'address' => $feature['properties']['formatted'] ?? '',
            'latitude' => $feature['properties']['lat'],
            'longitude' => $feature['properties']['lon'],
        ];
    }
}
