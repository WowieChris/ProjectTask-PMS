<?php

namespace App\Console\Commands;

use App\Services\PsgcService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class WarmPsgcCache extends Command
{
    protected $signature = 'psgc:warm';

    protected $description = 'Pre-fetch and cache PSA PSGC regions/provinces/municipalities/barangays so the app never has to fetch them live (which times out at 30s).';

    public function handle(PsgcService $psgc)
    {
        $this->info('Warming PSGC caches. This may take a few minutes for barangays (~42k rows)...');

        $this->line('Fetching regions...');
        $regions = $psgc->regions();
        $this->info('Regions cached: ' . count($regions['results']['psgc_data'] ?? []));

        $this->line('Fetching provinces (paginated)...');
        $provinces = $psgc->provinces();
        $this->info('Provinces cached: ' . count($provinces['results']['psgc_data'] ?? []));

        $this->line('Fetching municipalities (paginated, larger)...');
        $municipalities = $psgc->municipalities();
        $this->info('Municipalities cached: ' . count($municipalities['results']['psgc_data'] ?? []));

        $this->line('Fetching barangays (paginated, largest — be patient)...');
        $barangays = $psgc->barangays();
        $this->info('Barangays cached: ' . count($barangays['results']['psgc_data'] ?? []));

        $this->info('All PSGC caches warmed successfully.');

        return self::SUCCESS;
    }
}
