<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('org_position', function (Blueprint $table) {
            if (! Schema::hasColumn('org_position', 'designation_type_id')) {
                $table->char('designation_type_id', 10)->nullable()->after('designation_id')->index();
            }
            if (! Schema::hasColumn('org_position', 'function_group_id')) {
                $table->char('function_group_id', 10)->nullable()->after('section_key')->index();
            }
        });
    }

    public function down(): void
    {
        Schema::table('org_position', function (Blueprint $table) {
            if (Schema::hasColumn('org_position', 'designation_type_id')) {
                $table->dropColumn('designation_type_id');
            }
            if (Schema::hasColumn('org_position', 'function_group_id')) {
                $table->dropColumn('function_group_id');
            }
        });
    }
};
