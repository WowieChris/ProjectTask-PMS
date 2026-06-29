<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * This is a STUB migration — tables already exist in the database.
     * Created for version control documentation purposes only.
     * DO NOT run this on a database that already has these tables.
     * Covers: field_division, field_district, field_area, field_branch
     */
    public function up(): void
    {
        if (!Schema::hasTable('field_division')) {
            Schema::create('field_division', function (Blueprint $table) {
                $table->char('field_division_id', 10)->primary();
                $table->string('field_division_code', 10)->nullable();
                $table->string('field_division_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }

        if (!Schema::hasTable('field_district')) {
            Schema::create('field_district', function (Blueprint $table) {
                $table->char('field_district_id', 10)->primary();
                $table->char('field_division_id', 10)->nullable()->index();
                $table->string('field_district_code', 10)->nullable();
                $table->string('field_district_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }

        if (!Schema::hasTable('field_area')) {
            Schema::create('field_area', function (Blueprint $table) {
                $table->char('field_area_id', 10)->primary();
                $table->char('field_district_id', 10)->nullable()->index();
                $table->string('field_area_code', 10)->nullable();
                $table->string('field_area_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }

        if (!Schema::hasTable('field_branch')) {
            Schema::create('field_branch', function (Blueprint $table) {
                $table->char('field_branch_id', 10)->primary();
                $table->char('field_area_id', 10)->nullable()->index();
                $table->string('field_branch_code', 10)->nullable();
                $table->string('field_branch_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('field_branch');
        Schema::dropIfExists('field_area');
        Schema::dropIfExists('field_district');
        Schema::dropIfExists('field_division');
    }
};
