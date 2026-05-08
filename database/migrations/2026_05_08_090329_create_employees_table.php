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
        Schema::create('employees', function (Blueprint $table) {

            $table->id();

            // BASIC INFO
            $table->string('employee_id')->unique();

            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');

            $table->string('email')->nullable();
            $table->string('contact_number')->nullable();

            $table->date('birthdate')->nullable();
            $table->string('gender')->nullable();

            $table->text('address')->nullable();

            // EMPLOYMENT
            $table->foreignId('designation_id')->nullable()->constrained()->nullOnDelete();

            $table->foreignId('branch_id')->nullable()->constrained()->nullOnDelete();

            $table->foreignId('division_id')->nullable()->constrained()->nullOnDelete();

            $table->foreignId('district_id')->nullable()->constrained()->nullOnDelete();

            $table->foreignId('area_id')->nullable()->constrained()->nullOnDelete();

            $table->date('date_hired')->nullable();

            $table->enum('employment_status', [
                'active',
                'inactive',
                'separated',
                'probationary',
            ])->default('active');

            // FILES
            $table->string('photo')->nullable();

            // GOVERNMENT IDS
            $table->string('sss')->nullable();
            $table->string('philhealth')->nullable();
            $table->string('pagibig')->nullable();
            $table->string('tin')->nullable();

            // USER ACCOUNT LINK
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
