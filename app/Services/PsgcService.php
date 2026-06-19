<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class PsgcService
{
    protected string $baseUrl = 'https://psgc.gitlab.io/api';

    private function fetch(string $endpoint): array
    {
        $response = Http::timeout(60)->acceptJson()->get("{$this->baseUrl}/{$endpoint}.json");

        return $response->json() ?? [];
    }

    private function cachedList(string $endpoint): array
    {
        return Cache::remember("psgc_gitlab_{$endpoint}", now()->addDays(7), function () use ($endpoint) {
            return $this->fetch($endpoint);
        });
    }

    public function regions(): array
    {
        return $this->cachedList('regions');
    }

    public function provinces(): array
    {
        return $this->cachedList('provinces');
    }

    public function municipalities(): array
    {
        return $this->cachedList('cities-municipalities');
    }

    public function barangays(): array
    {
        return $this->cachedList('barangays');
    }
}
