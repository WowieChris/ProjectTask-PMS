<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class RefreshPsgcCache extends Command
{
    protected $signature = 'psgc:refresh';

    protected $description = 'Fetch all PSGC data from the PSA API (paginated) and cache it locally';

    /**
     * Each fetched page is appended as one line of JSON to this file
     * (JSON Lines format), instead of being held in one giant PHP array
     * that gets re-serialized into the database cache on every iteration.
     * That re-serialization was what exhausted memory previously.
     */
    protected function progressFilePath(): string
    {
        return storage_path('app/psgc_refresh_progress.jsonl');
    }

    protected function resumeStatePath(): string
    {
        return storage_path('app/psgc_refresh_resume.json');
    }

    public function handle()
    {
        // Generous memory headroom for the final assembly step. Terminal
        // commands aren't bound by typical web-request memory limits the
        // same way, but we set this explicitly to be safe.
        ini_set('memory_limit', '512M');

        $token = config('services.psgc.token');
        $url = 'https://classification.psa.gov.ph/psgc/Q2_2024/all';
        $pageNumber = 0;

        // Resume support: if a previous run was interrupted, pick up
        // from the saved URL/page instead of starting over and instead
        // of re-fetching pages already written to the progress file.
        if (file_exists($this->resumeStatePath())) {
            $resumeState = json_decode(file_get_contents($this->resumeStatePath()), true);
            if (! empty($resumeState['url'])) {
                $url = $resumeState['url'];
                $pageNumber = $resumeState['page'] ?? 0;
                $this->info("Resuming previous interrupted run from page {$pageNumber}...");
            }
        } else {
            // Fresh run — clear any old progress file so we don't duplicate rows.
            if (file_exists($this->progressFilePath())) {
                unlink($this->progressFilePath());
            }
        }

        $this->info('Starting PSGC cache refresh...');

        do {
            $pageNumber++;
            $this->line("Fetching page {$pageNumber}...");

            try {
                $response = Http::timeout(30)->get($url, [
                    'token' => $token,
                ]);
            } catch (\Throwable $e) {
                $this->saveResumeState($url, $pageNumber - 1);
                $this->error("Network error on page {$pageNumber}: {$e->getMessage()}");
                $this->warn('Progress saved. Run `php artisan psgc:refresh` again to resume.');

                return self::FAILURE;
            }

            if (! $response->successful()) {
                $this->saveResumeState($url, $pageNumber - 1);
                $this->error("HTTP {$response->status()} on page {$pageNumber}: {$response->body()}");
                $this->warn('Progress saved. Run `php artisan psgc:refresh` again to resume.');

                return self::FAILURE;
            }

            $body = $response->json();
            $pageRows = $body['results']['psgc_data'] ?? [];

            // Append this page's rows as one JSON-encoded line. This avoids
            // ever holding the full accumulated dataset in memory while
            // also re-serializing it on every loop iteration.
            $handle = fopen($this->progressFilePath(), 'a');
            foreach ($pageRows as $row) {
                fwrite($handle, json_encode($row) . "\n");
            }
            fclose($handle);

            $url = $body['next'] ?? null;
            $this->saveResumeState($url, $pageNumber);

            // Free memory from this iteration before the next request.
            unset($body, $pageRows, $response);
        } while ($url);

        $this->info('All pages fetched. Loading from disk into cache...');

        // Read the JSON Lines file back in once, build the final array,
        // and store it a single time — this is the only point we hold
        // the complete dataset in memory, and we only serialize it once.
        $all = [];
        $fileHandle = fopen($this->progressFilePath(), 'r');
        while (($line = fgets($fileHandle)) !== false) {
            $line = trim($line);
            if ($line === '') {
                continue;
            }
            $all[] = json_decode($line, true);
        }
        fclose($fileHandle);

        Cache::put('psgc_all_data', $all, now()->addDays(30));

        // Clean up progress/resume files now that the real cache is set.
        @unlink($this->progressFilePath());
        @unlink($this->resumeStatePath());

        $this->info('Done. Cached ' . count($all) . " rows across {$pageNumber} pages.");

        return self::SUCCESS;
    }

    protected function saveResumeState(?string $url, int $page): void
    {
        file_put_contents($this->resumeStatePath(), json_encode([
            'url' => $url,
            'page' => $page,
        ]));
    }
}
