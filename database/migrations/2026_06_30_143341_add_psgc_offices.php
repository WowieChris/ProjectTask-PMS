<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected array $tables = ['divisions', 'districts', 'areas', 'branches'];

    public function up(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->string('psgc_province_name')->nullable()->after('address');
                $blueprint->string('psgc_city_name')->nullable()->after('psgc_province_name');
            });
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->dropColumn(['psgc_province_name', 'psgc_city_name']);
            });
        }
    }
};