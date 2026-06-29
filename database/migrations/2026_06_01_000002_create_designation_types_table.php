<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('designation_types', function (Blueprint $table) {
            $table->char('designation_type_id', 10)->primary();
            $table->char('designation_level_id', 10)->index();
            $table->string('type_name', 80);
            $table->integer('sort_order')->default(0);
            $table->tinyInteger('active_yn')->default(1);
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();

            $table->foreign('designation_level_id')
                ->references('designation_level_id')
                ->on('designation_levels');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('designation_types');
    }
};
