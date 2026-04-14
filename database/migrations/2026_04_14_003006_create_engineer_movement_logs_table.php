<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('engineer_movement_logs', function (Blueprint $table) {
            $table->id();

            $table->string('area_name');

            $table->string('previous_engineer')->nullable();
            $table->string('new_engineer');

            $table->string('assigned_by');

            $table->date('effectivity_date');

            $table->timestamps(); // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('engineer_movement_logs');
    }
};
