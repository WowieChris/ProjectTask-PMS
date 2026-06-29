<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * This is a STUB migration — the table already exists in the database.
     * Created for version control documentation purposes only.
     * DO NOT run this on a database that already has this table.
     */
    public function up(): void
    {
        if (Schema::hasTable('org_main_setup')) {
            return;
        }

        Schema::create('org_main_setup', function (Blueprint $table) {
            $table->char('org_main_setup_id', 10)->primary();
            $table->char('org_main_segment_id', 10)->nullable()->index();
            $table->char('org_main_department_id', 10)->nullable()->index();
            $table->char('org_main_division_id', 10)->nullable()->index();
            $table->char('org_main_section_id', 10)->nullable()->index();
            $table->char('org_main_team_id', 10)->nullable()->index();
            $table->date('effective_date')->nullable();
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
            $table->char('main_division_id', 10)->nullable()->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('org_main_setup');
    }
};
