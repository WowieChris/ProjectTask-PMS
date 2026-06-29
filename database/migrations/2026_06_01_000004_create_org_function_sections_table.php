<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('org_function_sections', function (Blueprint $table) {
            $table->char('function_section_id', 10)->primary();
            $table->char('function_area_id', 10)->index();
            $table->string('section_name', 120);
            $table->integer('sort_order')->default(0);
            $table->tinyInteger('active_yn')->default(1);
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();

            $table->foreign('function_area_id')
                ->references('function_area_id')
                ->on('org_function_areas');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('org_function_sections');
    }
};
