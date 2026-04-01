<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Determine if a foreign key exists on `divisions(area_id)` before attempting to drop it.
        $database = env('DB_DATABASE') ?? config('database.connections.'.config('database.default').'.database');

        $fk = DB::selectOne(
            'SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL',
            [$database, 'divisions', 'area_id']
        );

        Schema::table('divisions', function (Blueprint $table) use ($fk) {
            if ($fk) {
                // Use the actual constraint name when available.
                $table->dropForeign($fk->CONSTRAINT_NAME);
                $table->renameColumn('area_id', 'user_group_id');
            } else {
                // If `area_id` doesn't exist, create `user_group_id` if missing.
                if (! Schema::hasColumn('divisions', 'user_group_id')) {
                    $table->foreignId('user_group_id')->after('id')->constrained('user_groups')->cascadeOnDelete();
                }
            }
        });

        // Add FK if we renamed, but only if a FK does not already exist for the column.
        $database = env('DB_DATABASE') ?? config('database.connections.'.config('database.default').'.database');

        $existingFk = DB::selectOne(
            'SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL',
            [$database, 'divisions', 'user_group_id']
        );

        Schema::table('divisions', function (Blueprint $table) use ($existingFk) {
            if (Schema::hasColumn('divisions', 'user_group_id') && ! $existingFk) {
                $table->foreign('user_group_id')->references('id')->on('user_groups')->cascadeOnDelete();
            }
        });
    }

    public function down(): void
    {
        // In down, only attempt to drop the FK/rename if the column exists.
        Schema::table('divisions', function (Blueprint $table) {
            if (Schema::hasColumn('divisions', 'user_group_id')) {
                // Attempt to drop the FK only if it exists.
                $database = env('DB_DATABASE') ?? config('database.connections.'.config('database.default').'.database');

                $fk = DB::selectOne(
                    'SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL',
                    [$database, 'divisions', 'user_group_id']
                );

                if ($fk) {
                    $table->dropForeign($fk->CONSTRAINT_NAME);
                }

                // revert rename back
                $table->renameColumn('user_group_id', 'area_id');
            }
        });
    }
};
