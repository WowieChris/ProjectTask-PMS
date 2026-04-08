<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('location_transfer_logs', function (Blueprint $table) {
            $table->id();

            $table->string('type');
            $table->unsignedBigInteger('location_id');
            $table->string('location_name')->nullable();

            $table->unsignedBigInteger('from_parent_id')->nullable();
            $table->string('from_parent_name')->nullable();

            $table->unsignedBigInteger('to_parent_id')->nullable();
            $table->string('to_parent_name')->nullable();

            $table->date('effectivity_date')->nullable();

            $table->unsignedBigInteger('moved_by')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_transfer_logs');
    }
};
