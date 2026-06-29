<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('designation_levels', function (Blueprint $table) {
            $table->char('designation_level_id', 10)->primary();
            $table->string('level_name', 80)->unique();
            $table->integer('sort_order')->default(0);
            $table->tinyInteger('active_yn')->default(1);
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('designation_levels');
    }
};
