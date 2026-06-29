<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('org_function_areas', function (Blueprint $table) {
            $table->char('function_area_id', 10)->primary();
            $table->char('department_id', 10)->nullable()->index();
            $table->string('area_name', 120);
            $table->integer('sort_order')->default(0);
            $table->tinyInteger('active_yn')->default(1);
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('org_function_areas');
    }
};
