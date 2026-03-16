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
        Schema::create('service_orders', function (Blueprint $table) {
            $table->id();
            $table->string('tse_jo_no')->unique();
            $table->string('tse_assigned')->nullable();
            $table->string('requesting_party');
            $table->string('department')->nullable();
            $table->string('location')->nullable();
            $table->date('date_reported');
            $table->string('issues_encountered');
            $table->text('technical_issue_description')->nullable();
            $table->text('action_taken')->nullable();
            $table->string('frequency')->nullable();
            $table->integer('turnaround_time_mins')->nullable();
            $table->string('status')->default('Pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_orders');
    }
};
