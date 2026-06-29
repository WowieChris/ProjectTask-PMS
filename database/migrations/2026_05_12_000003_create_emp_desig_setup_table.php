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
        if (Schema::hasTable('emp_desig_setup')) {
            return;
        }

        Schema::create('emp_desig_setup', function (Blueprint $table) {
            $table->char('emp_desig_setup_id', 10)->primary();
            $table->char('employee_id', 10)->nullable()->index();
            $table->char('designation_id', 10)->nullable()->index();
            $table->date('effective_date')->nullable();
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emp_desig_setup');
    }
};
