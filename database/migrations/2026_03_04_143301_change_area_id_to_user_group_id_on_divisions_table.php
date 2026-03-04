<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('divisions', function (Blueprint $table) {
            // If you have FK constraint on area_id, drop it first safely
            if (Schema::hasColumn('divisions', 'area_id')) {
                try { $table->dropForeign(['area_id']); } catch (\Throwable $e) {}
                $table->renameColumn('area_id', 'user_group_id');
            } else {
                // if no area_id column, just create user_group_id
                if (!Schema::hasColumn('divisions', 'user_group_id')) {
                    $table->foreignId('user_group_id')->after('id')->constrained('user_groups')->cascadeOnDelete();
                }
            }
        });

        // Add FK if we renamed
        Schema::table('divisions', function (Blueprint $table) {
            if (Schema::hasColumn('divisions', 'user_group_id')) {
                try { $table->foreign('user_group_id')->references('id')->on('user_groups')->cascadeOnDelete(); } catch (\Throwable $e) {}
            }
        });
    }

    public function down(): void
    {
        Schema::table('divisions', function (Blueprint $table) {
            if (Schema::hasColumn('divisions', 'user_group_id')) {
                try { $table->dropForeign(['user_group_id']); } catch (\Throwable $e) {}
                // revert rename back
                $table->renameColumn('user_group_id', 'area_id');
            }
        });
    }
};