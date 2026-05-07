<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();

            $table->string('asset_tag')->unique();
            $table->string('name');

            $table->foreignId('category_id')
                ->nullable()
                ->constrained('asset_categories')
                ->nullOnDelete();

            $table->foreignId('branch_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('serial_number')->nullable();

            $table->date('purchase_date')->nullable();

            $table->decimal('purchase_cost', 12, 2)->nullable();

            $table->enum('status', [
                'available',
                'assigned',
                'maintenance',
                'disposed'
            ])->default('available');

            $table->text('remarks')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
