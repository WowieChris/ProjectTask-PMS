<?php

namespace App\Console\Commands;

use App\Http\Controllers\ScheduledLocationMoveController;
use App\Models\ScheduledLocationMove;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Throwable;

class ApplyScheduledLocationMoves extends Command
{
    protected $signature   = 'locations:apply-scheduled-moves';
    protected $description = 'Auto-apply pending location moves whose scheduled_at has passed';

    public function handle(): int
    {
        $due = ScheduledLocationMove::due()->get();

        if ($due->isEmpty()) {
            $this->info('No pending location moves are due.');
            return self::SUCCESS;
        }

        $this->info("Found {$due->count()} due move(s). Applying…");

        $applied = 0;
        $failed  = 0;

        foreach ($due as $move) {
            try {
                DB::transaction(function () use ($move) {
                    ScheduledLocationMoveController::applyMove($move, 'System (Scheduler)');
                });

                $this->line("  ✔ Move #{$move->id} applied — {$move->location_type} #{$move->location_id}");
                $applied++;
            } catch (Throwable $e) {
                $this->error("  ✘ Move #{$move->id} failed: {$e->getMessage()}");
                $failed++;
            }
        }

        $this->info("Done. Applied: {$applied} | Failed: {$failed}");

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
    }
}