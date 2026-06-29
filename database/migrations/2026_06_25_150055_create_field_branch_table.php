<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('field_branch', function (Blueprint $table) {
            $table->char('field_branch_id', 10)->primary();
            $table->string('field_branch_code', 10)->nullable();
            $table->string('field_branch_name', 10)->nullable();
            $table->char('field_area_id', 10)->nullable();
            $table->string('address', 255)->nullable();
            $table->string('description', 50)->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->tinyInteger('active_yn')->default(1);
            $table->timestamp('record_created')->useCurrent();
            $table->timestamp('record_updated')->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('field_branch');
    }
};