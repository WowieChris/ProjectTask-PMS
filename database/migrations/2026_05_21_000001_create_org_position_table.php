<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('org_position', function (Blueprint $table) {
            $table->char('org_position_id', 10)->primary();
            $table->string('position_title', 100)->nullable();
            $table->char('designation_id', 10)->nullable()->index();
            $table->char('parent_position_id', 10)->nullable()->index();
            $table->char('department_id', 10)->nullable()->index();
            $table->char('employee_id', 10)->nullable()->index();
            $table->integer('sort_order')->default(0);
            $table->tinyInteger('active_yn')->default(1);
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('org_position');
    }
};
