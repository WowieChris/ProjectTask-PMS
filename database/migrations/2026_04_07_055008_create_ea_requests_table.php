<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ea_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_id')->unique();
            $table->string('full_name');
            $table->string('department')->nullable();
            $table->string('request_title');
            $table->string('request_type');
            $table->text('item_requested')->nullable();  // ← added
            $table->date('date_received');
            $table->string('srf_number')->nullable();
            $table->string('status')->default('Pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ea_requests');
    }
};