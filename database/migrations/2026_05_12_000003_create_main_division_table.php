<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('main_division', function (Blueprint $table) {
            $table->char('main_division_id', 10)->primary();
            $table->string('main_division_code', 10)->nullable();
            $table->string('main_division_name', 50)->nullable();
            $table->char('main_department_id', 10)->nullable();
            $table->string('description', 50)->nullable();
            $table->tinyInteger('active_yn')->nullable();
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('main_division');
    }
};
