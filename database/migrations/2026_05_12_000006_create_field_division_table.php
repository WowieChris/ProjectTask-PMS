<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
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

    public function down(): void
    {
        Schema::dropIfExists('field_division');
    }
};
