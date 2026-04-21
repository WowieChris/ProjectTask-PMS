<?php

namespace App\Console\Commands;

use App\Http\Controllers\ScheduledTransferController;
use App\Models\ScheduledEngineerTransfer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Throwable;

class ApplyScheduledEngineerTransfers extends Command
{
    protected $signature   = 'engineers:apply-scheduled-transfers';
    protected $description = 'Auto-apply pending engineer transfers whose scheduled_at has passed';

    public function handle(): int
    {
        $due = ScheduledEngineerTransfer::due()
            ->with(['engineer', 'area', 'district'])
            ->get();

        if ($due->isEmpty()) {
            $this->info('No pending transfers are due.');
            return self::SUCCESS;
        }

        $this->info("Found {$due->count()} due transfer(s). Applying…");

        $applied = 0;
        $failed  = 0;

        foreach ($due as $transfer) {
            try {
                DB::transaction(function () use ($transfer) {
                    // ✅ Calls the static method directly — no instantiation needed
                    ScheduledTransferController::applyTransfer($transfer, 'System (Scheduler)');
                });

                $this->line("  ✔ Transfer #{$transfer->id} applied — {$transfer->engineer?->name}");
                $applied++;
            } catch (Throwable $e) {
                $this->error("  ✘ Transfer #{$transfer->id} failed: {$e->getMessage()}");
                $failed++;
            }
        }

        $this->info("Done. Applied: {$applied} | Failed: {$failed}");

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
    }
}