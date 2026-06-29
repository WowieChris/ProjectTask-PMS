<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('main_team', function (Blueprint $table) {
            $table->char('main_team_id', 10)->primary();
            $table->string('main_team_code', 10)->nullable();
            $table->string('main_team_name', 50)->nullable();
            $table->char('main_section_id', 10)->nullable();
            $table->string('description', 50)->nullable();
            $table->tinyInteger('active_yn')->nullable();
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('main_team');
    }
};
