<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('divisions', function (Blueprint $table) {
            if (!Schema::hasColumn('divisions', 'area_id')) {
                return;
            }

            $table->foreign('area_id')->references('id')->on('areas')->onDelete('cascade');
        });

        Schema::table('districts', function (Blueprint $table) {
            if (!Schema::hasColumn('districts', 'division_id')) {
                return;
            }

            $table->foreign('division_id')->references('id')->on('divisions')->onDelete('cascade');
        });

        Schema::table('areas', function (Blueprint $table) {
            if (!Schema::hasColumn('areas', 'district_id')) {
                return;
            }

            $table->foreign('district_id')->references('id')->on('districts')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('divisions', function (Blueprint $table) {
            $table->dropForeign(['area_id']);
        });

        Schema::table('districts', function (Blueprint $table) {
            $table->dropForeign(['division_id']);
        });

        Schema::table('areas', function (Blueprint $table) {
            $table->dropForeign(['district_id']);
        });
    }
};
