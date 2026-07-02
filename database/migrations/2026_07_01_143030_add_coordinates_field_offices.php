<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected array $tables = ['field_area', 'field_district', 'field_division'];

    public function up(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->decimal('latitude', 10, 7)->nullable()->after('description');
                $table->decimal('longitude', 10, 7)->nullable()->after('latitude');
                $table->string('address')->nullable()->after('longitude');
            });
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn(['latitude', 'longitude', 'address']);
            });
        }
    }
};