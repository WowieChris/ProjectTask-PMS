<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NominatimGeocodingService
{
    protected string $baseUrl;
    protected string $userAgent;

    // Philippine address abbreviations → full words Nominatim understands
    protected array $abbreviations = [
        '/\bBrgy\./i'        => 'Barangay',
        '/\bBrgy\b/i'        => 'Barangay',
        '/\bPrk\./i'         => 'Purok',
        '/\bPrk\b/i'         => 'Purok',
        '/\bBlk\./i'         => 'Block',
        '/\bBlk\b/i'         => 'Block',
        '/\bLot\b/i'         => 'Lot',
        '/\bSubd\./i'        => 'Subdivision',
        '/\bSubd\b/i'        => 'Subdivision',
        '/\bSubd\./i'        => 'Subdivision',
        '/\bSt\./i'          => 'Street',
        '/\bAve\./i'         => 'Avenue',
        '/\bExt\./i'         => 'Extension',
        '/\bNr\./i'          => '',
        '/\bPob\./i'         => 'Poblacion',
        '/\bPob\b/i'         => 'Poblacion',
        '/\bSto\.\s*Ni[ñn]o/iu' => 'Santo Nino',
        '/Do[ñn]a/iu'        => 'Dona',
        '/[ñÑ]/u'            => 'n',
        '/\bSta\./i'         => 'Santa',
        '/\bSto\./i'         => 'Santo',
        '/\bGen\./i'         => 'General',
        '/\bDr\./i'          => 'Doctor',
        '/\bM\.H\./i'        => 'M.H.',
        '/\bDel\b/i'         => 'Del',
    ];

    public function __construct()
    {
        $this->baseUrl  = config('nominatim.base_url');
        $this->userAgent = config('nominatim.user_agent');
    }

    /**
     * Forward geocode a Philippine address into coordinates.
     * Tries the full normalized address first, then falls back to a simplified version.
     *
     * @return array{lat: float, lon: float, label: string, importance: float|null}|null
     */
    public function geocode(string $address): ?array
    {
        $normalized = $this->normalize($address);

        // Attempt 1: full normalized address + Philippines
        $result = $this->search($normalized);
        if ($result) return $result;

        // Attempt 2: subdivision/village name + city + province
        // (strips lot/block numbers but keeps the subdivision name, which may exist in OSM)
        $subdivisionLevel = $this->subdivisionOnly($normalized);
        if ($subdivisionLevel && $subdivisionLevel !== $normalized) {
            $result = $this->search($subdivisionLevel);
            if ($result) return $result;
        }

        // Attempt 3: barangay + city + province
        // (strips everything up to the barangay name)
        $barangayLevel = $this->barangayOnly($normalized);
        if ($barangayLevel && $barangayLevel !== $normalized) {
            $result = $this->search($barangayLevel);
            if ($result) return $result;
        }

        // Attempt 4: last resort — just city/municipality + province
        $cityLevel = $this->cityOnly($normalized);
        if ($cityLevel) {
            $result = $this->search($cityLevel);
            if ($result) return $result;
        }

        Log::info('Nominatim: no match after all attempts', ['original' => $address]);

        return null;
    }

    /**
     * Reverse geocode coordinates into a human-readable address.
     *
     * @return array{label: string|null}|null
     */
    public function reverseGeocode(float $lat, float $lon): ?array
    {
        $response = Http::withoutVerifying()
            ->withHeaders(['User-Agent' => $this->userAgent])
            ->baseUrl($this->baseUrl)
            ->get('/reverse', [
                'lat'    => $lat,
                'lon'    => $lon,
                'format' => 'jsonv2',
            ]);

        if ($response->failed()) {
            Log::warning('Nominatim reverse geocode failed', ['lat' => $lat, 'lon' => $lon]);
            return null;
        }

        $result = $response->json();

        if (empty($result) || isset($result['error'])) {
            return null;
        }

        return ['label' => $result['display_name'] ?? null];
    }

    // -------------------------------------------------------------------------
    // Internal helpers
    // -------------------------------------------------------------------------

    protected function search(string $query): ?array
    {
        $response = Http::withoutVerifying()
            ->withHeaders(['User-Agent' => $this->userAgent])
            ->baseUrl($this->baseUrl)
            ->get('/search', [
                'q'               => $query,
                'format'          => 'jsonv2',
                'limit'           => 1,
                'countrycodes'    => 'ph',  // restrict results to the Philippines
            ]);

        if ($response->failed()) {
            Log::warning('Nominatim search request failed', ['query' => $query, 'status' => $response->status()]);
            return null;
        }

        $results = $response->json();

        if (empty($results)) {
            return null;
        }

        $hit = $results[0];

        return [
            'lat'        => (float) $hit['lat'],
            'lon'        => (float) $hit['lon'],
            'label'      => $hit['display_name'] ?? $query,
            'importance' => $hit['importance'] ?? null,
        ];
    }

    /**
     * Normalize Philippine abbreviations and ensure "Philippines" is appended.
     */
    protected function normalize(string $address): string
    {
        // Fix encoding issues (ñ stored as \xf1)
        $address = mb_convert_encoding($address, 'UTF-8', 'auto');

        // Expand abbreviations
        foreach ($this->abbreviations as $pattern => $replacement) {
            $address = preg_replace($pattern, $replacement, $address);
        }

        // Clean up extra spaces and commas
        $address = preg_replace('/\s{2,}/', ' ', $address);
        $address = preg_replace('/,\s*,/', ',', $address);
        $address = trim($address, " ,\t");

        // Append Philippines if not already present
        if (! str_contains(strtolower($address), 'philippines')) {
            $address .= ', Philippines';
        }

        return $address;
    }

    /**
     * Strip lot/block/unit/purok/house number noise but KEEP the subdivision or
     * village name — e.g. "Lot 5 Blk 3, Greenplains Subd., Barangay X, Bacolod City, Negros Occidental"
     * becomes "Greenplains Subdivision, Bacolod City, Negros Occidental, Philippines".
     * Useful when the subdivision exists in OSM but the full address with lot numbers doesn't match.
     */
    protected function subdivisionOnly(string $address): ?string
    {
        // Strip leading lot/block/unit/door/purok/#number tokens
        $stripped = preg_replace(
            '/^[\s,]*(Lot\s[\d\w\s&.-]+?|Block\s[\d\w]+|Unit\s[\d\w]+|Door\s[\d\w]+|Purok\s[\d\w-]+|#[\d\w]+|[\d]+[\s,]+)+/i',
            '',
            $address
        );

        // Look for known subdivision/village keyword
        $hasSubdivision = preg_match(
            '/\b(Subdivision|Village|Homes|Heights|Subd|Compound|Estate|Park|Hills|Valley|Residences|Ville|Compound)\b/i',
            $stripped
        );

        if (! $hasSubdivision) {
            return null;
        }

        // Strip the barangay clause (Barangay X,) and everything before the subdivision name
        // Keep: SubdivisionName, City, Province, Philippines
        $result = preg_replace('/,?\s*Barangay\s+[\w\s.-]+,?/i', ',', $stripped);
        $result = preg_replace('/,\s*,/', ',', $result);
        $result = trim($result, " ,\t");

        // Ensure Philippines is still appended
        if (! str_contains(strtolower($result), 'philippines')) {
            $result .= ', Philippines';
        }

        return $result ?: null;
    }

    /**
     * Strip everything up to and including the Barangay name,
     * leaving Barangay + City/Municipality + Province.
     */
    protected function barangayOnly(string $address): ?string
    {
        // If address contains "Barangay X", extract from that point on
        if (preg_match('/(Barangay\s+[\w\s.-]+(?:,\s*[\w\s.-]+){1,3})/i', $address, $matches)) {
            $result = trim($matches[1], " ,\t");

            if (! str_contains(strtolower($result), 'philippines')) {
                $result .= ', Philippines';
            }

            return $result;
        }

        return null;
    }

    /**
     * Extract just the city/municipality and province as a last-resort fallback.
     * Works by taking the last 2–3 comma-separated parts before "Philippines".
     */
    protected function cityOnly(string $address): ?string
    {
        $parts = array_map('trim', explode(',', $address));

        // Remove "Philippines" from the end if present
        $parts = array_filter($parts, fn ($p) => strtolower($p) !== 'philippines');
        $parts = array_values($parts);

        if (count($parts) < 2) {
            return null;
        }

        // Take last 2 parts (city + province) and re-append Philippines
        $tail = array_slice($parts, -2);

        return implode(', ', $tail) . ', Philippines';
    }
}