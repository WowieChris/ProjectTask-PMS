<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scheduled_engineer_transfers', function (Blueprint $table) {
            $table->id();

            // Who is being transferred
            $table->foreignId('engineer_id')->constrained('users')->cascadeOnDelete();

            // Where they're going (district = base assignment; area = override)
            $table->foreignId('district_id')->constrained('districts')->cascadeOnDelete();
            $table->foreignId('area_id')->nullable()->constrained('areas')->nullOnDelete();

            // When to apply
            $table->dateTime('scheduled_at');

            // pending → applied | cancelled
            $table->enum('status', ['pending', 'applied', 'cancelled'])->default('pending');

            // Who scheduled it
            $table->string('scheduled_by');

            // Optional note
            $table->text('notes')->nullable();

            // Filled once applied
            $table->dateTime('applied_at')->nullable();
            $table->string('applied_by')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scheduled_engineer_transfers');
    }
};
