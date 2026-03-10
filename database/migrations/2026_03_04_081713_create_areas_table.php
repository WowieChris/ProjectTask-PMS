<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_group_id')
                ->constrained('user_groups')
                ->cascadeOnDelete();

            $table->string('name');

            $table->timestamps();

            $table->unique(['user_group_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('areas');
    }
};
