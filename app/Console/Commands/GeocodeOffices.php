<?php

namespace App\Console\Commands;

use App\Models\Area;
use App\Models\Branch;
use App\Models\District;
use App\Models\Division;
use App\Services\NominatimGeocodingService;
use Illuminate\Console\Command;

class GeocodeOffices extends Command
{
    protected $signature = 'offices:geocode {--level=all : division|district|area|branch|all} {--retry-failed}';

    protected $description = 'Geocode office addresses (division/district/area/branch) into latitude/longitude using Nominatim';

    /**
     * Map of level name => Eloquent model class.
     * Adjust the class paths here if your models live elsewhere or are named differently.
     */
    protected array $levels = [
        'division' => Division::class,
        'district' => District::class,
        'area' => Area::class,
        'branch' => Branch::class,
    ];

    public function handle(NominatimGeocodingService $nominatim): int
    {
        $level = $this->option('level');

        $targets = $level === 'all'
            ? $this->levels
            : array_filter($this->levels, fn ($key) => $key === $level, ARRAY_FILTER_USE_KEY);

        if (empty($targets)) {
            $this->error("Unknown level: {$level}. Use one of: division, district, area, branch, all.");

            return self::FAILURE;
        }

        foreach ($targets as $name => $modelClass) {
            $this->geocodeLevel($name, $modelClass, $nominatim);
        }

        return self::SUCCESS;
    }

    protected function geocodeLevel(string $name, string $modelClass, NominatimGeocodingService $nominatim): void
    {
        $query = $modelClass::query()->whereNotNull('address')->whereNull('latitude');

        if (! $this->option('retry-failed')) {
            $query->where('geocode_status', '!=', 'failed');
        }

        $records = $query->get();

        if ($records->isEmpty()) {
            $this->info(ucfirst($name).'s: nothing to geocode.');

            return;
        }

        $this->info('Geocoding '.$records->count().' '.$name.'(s)...');
        $bar = $this->output->createProgressBar($records->count());
        $bar->start();

        $failed = [];

        foreach ($records as $record) {
    $result = $nominatim->geocode(
        $record->address,
        $record->psgc_city_name ?? null,
        $record->psgc_province_name ?? null,
    );

    if ($result === null) {
        $record->update(['geocode_status' => 'failed', 'geocoded_at' => now()]);
        $failed[] = $record->id;
    } else {
        $record->update([
            'latitude' => $result['lat'],
            'longitude' => $result['lon'],
            'geocode_status' => 'success',
            'geocoded_at' => now(),
        ]);
    }

    $bar->advance();
    usleep(1_100_000);
}

        $bar->finish();
        $this->newLine();

        if (! empty($failed)) {
            $this->warn(ucfirst($name).'(s) that failed to geocode: '.implode(', ', $failed));
        }
    }
}