<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('org_position', function (Blueprint $table) {
            if (!Schema::hasColumn('org_position', 'section_key')) {
                $table->string('section_key', 50)->nullable()->after('department_id')->index();
            }

            if (!Schema::hasColumn('org_position', 'position_type')) {
                $table->string('position_type', 50)->nullable()->after('section_key')->index();
            }

            if (!Schema::hasColumn('org_position', 'level_no')) {
                $table->integer('level_no')->nullable()->after('position_type')->index();
            }

            if (!Schema::hasColumn('org_position', 'locked_yn')) {
                $table->tinyInteger('locked_yn')->default(0)->after('active_yn');
            }

            if (!Schema::hasColumn('org_position', 'org_segment')) {
                $table->string('org_segment', 10)->nullable()->after('department_id');
            }

            if (!Schema::hasColumn('org_position', 'org_level_name')) {
                $table->string('org_level_name', 30)->nullable()->after('org_segment');
            }

            if (!Schema::hasColumn('org_position', 'org_level_id')) {
                $table->string('org_level_id', 50)->nullable()->after('org_level_name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('org_position', function (Blueprint $table) {
            $columns = [
                'section_key',
                'position_type',
                'level_no',
                'locked_yn',
                'org_segment',
                'org_level_name',
                'org_level_id',
            ];

            foreach ($columns as $column) {
                if (Schema::hasColumn('org_position', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};