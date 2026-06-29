<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * This is a STUB migration — the table already exists in the database.
     * Created for version control documentation purposes only.
     * DO NOT run this on a database that already has this table.
     */
    public function up(): void
    {
        if (Schema::hasTable('designation')) {
            return;
        }

        Schema::create('designation', function (Blueprint $table) {
            $table->char('designation_id', 10)->primary();
            $table->char('designation_code', 10)->nullable();
            $table->string('designation_name', 50)->nullable();
            $table->string('description', 50)->nullable();
            $table->string('designation_level', 20)->nullable();
            $table->tinyInteger('active_yn')->nullable();
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('designation');
    }
};
