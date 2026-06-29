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
        if (Schema::hasTable('employee')) {
            return; // Table already exists, skip
        }

        Schema::create('employee', function (Blueprint $table) {
            $table->char('employee_id', 10)->primary();
            $table->char('employee_code', 10)->nullable();
            $table->string('first_name', 50)->nullable();
            $table->string('middle_name', 50)->nullable();
            $table->string('last_name', 50)->nullable();
            $table->date('hire_date')->nullable();
            $table->date('regularization_date')->nullable();
            $table->date('exit_date')->nullable();
            $table->string('employment_status', 20)->nullable();
            $table->string('mobile_number', 14)->nullable();
            $table->string('email_address', 50)->nullable();
            $table->tinyInteger('active_yn')->nullable();
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee');
    }
};
