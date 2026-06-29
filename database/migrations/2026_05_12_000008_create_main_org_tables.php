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
     * Covers: main_segment, main_department, main_division, main_section, main_team
     */
    public function up(): void
    {
        if (!Schema::hasTable('main_segment')) {
            Schema::create('main_segment', function (Blueprint $table) {
                $table->char('main_segment_id', 10)->primary();
                $table->string('main_segment_code', 10)->nullable();
                $table->string('main_segment_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }

        if (!Schema::hasTable('main_department')) {
            Schema::create('main_department', function (Blueprint $table) {
                $table->char('main_department_id', 10)->primary();
                $table->char('main_segment_id', 10)->nullable()->index();
                $table->string('main_department_code', 10)->nullable();
                $table->string('main_department_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }

        if (!Schema::hasTable('main_division')) {
            Schema::create('main_division', function (Blueprint $table) {
                $table->char('main_division_id', 10)->primary();
                $table->char('main_department_id', 10)->nullable()->index();
                $table->string('main_division_code', 10)->nullable();
                $table->string('main_division_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }

        if (!Schema::hasTable('main_section')) {
            Schema::create('main_section', function (Blueprint $table) {
                $table->char('main_section_id', 10)->primary();
                $table->char('main_division_id', 10)->nullable()->index();
                $table->string('main_section_code', 10)->nullable();
                $table->string('main_section_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }

        if (!Schema::hasTable('main_team')) {
            Schema::create('main_team', function (Blueprint $table) {
                $table->char('main_team_id', 10)->primary();
                $table->char('main_section_id', 10)->nullable()->index();
                $table->string('main_team_code', 10)->nullable();
                $table->string('main_team_name', 50)->nullable();
                $table->string('description', 50)->nullable();
                $table->tinyInteger('active_yn')->nullable();
                $table->timestamp('record_created')->nullable();
                $table->timestamp('record_updated')->nullable();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('main_team');
        Schema::dropIfExists('main_section');
        Schema::dropIfExists('main_division');
        Schema::dropIfExists('main_department');
        Schema::dropIfExists('main_segment');
    }
};
