<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('org_function_groups', function (Blueprint $table) {
            $table->char('function_group_id', 10)->primary();
            $table->char('function_section_id', 10)->index();
            $table->string('group_name', 120);
            $table->integer('sort_order')->default(0);
            $table->tinyInteger('active_yn')->default(1);
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();

            $table->foreign('function_section_id')
                ->references('function_section_id')
                ->on('org_function_sections');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('org_function_groups');
    }
};
