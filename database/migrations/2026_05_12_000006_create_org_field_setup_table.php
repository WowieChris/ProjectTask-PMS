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
        if (Schema::hasTable('org_field_setup')) {
            return;
        }

        Schema::create('org_field_setup', function (Blueprint $table) {
            $table->char('org_field_setup_id', 10)->primary();
            $table->char('org_field_division_id', 10)->nullable()->index();
            $table->char('org_field_district_id', 10)->nullable()->index();
            $table->char('org_field_area_id', 10)->nullable()->index();
            $table->char('org_field_branch_id', 10)->nullable()->index();
            $table->date('effective_date')->nullable();
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('org_field_setup');
    }
};
