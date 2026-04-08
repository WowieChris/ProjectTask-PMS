<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('engineer_movement_logs', function (Blueprint $table) {
            $table->id();
            $table->string('area_name');
            $table->string('previous_engineer')->nullable();
            $table->string('new_engineer')->nullable();
            $table->string('assigned_by');
            $table->date('effectivity_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('engineer_movement_logs');
    }
};
