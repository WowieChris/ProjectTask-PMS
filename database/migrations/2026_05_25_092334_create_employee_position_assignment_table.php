<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_position_assignment', function (Blueprint $table) {
            $table->char('employee_position_assignment_id', 10)->primary();

            $table->char('employee_id', 10)->index();
            $table->char('org_position_id', 10)->index();

            $table->date('effective_date')->nullable();
            $table->date('end_date')->nullable();

            $table->tinyInteger('active_yn')->default(1)->index();

            $table->char('assigned_by', 10)->nullable();
            $table->string('remarks', 255)->nullable();

            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();

            $table->index(['employee_id', 'active_yn']);
            $table->index(['org_position_id', 'active_yn']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_position_assignment');
    }
};