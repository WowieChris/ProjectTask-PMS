<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('divisions', 'area_id')) {
            DB::statement('ALTER TABLE `divisions` MODIFY `area_id` BIGINT UNSIGNED NULL');
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('divisions', 'area_id')) {
            DB::statement('ALTER TABLE `divisions` MODIFY `area_id` BIGINT UNSIGNED NOT NULL');
        }
    }
};
