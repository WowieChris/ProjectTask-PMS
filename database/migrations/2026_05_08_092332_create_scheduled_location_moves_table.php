<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scheduled_location_moves', function (Blueprint $table) {
            $table->id();
            $table->string('location_type');
            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('target_parent_id');
            $table->timestamp('scheduled_at');
            $table->string('status')->default('pending');
            $table->string('scheduled_by');
            $table->string('applied_by')->nullable();
            $table->timestamp('applied_at')->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scheduled_location_moves');
    }
};