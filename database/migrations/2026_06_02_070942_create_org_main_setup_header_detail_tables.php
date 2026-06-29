<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('org_main_setup_header')) {
            Schema::create('org_main_setup_header', function (Blueprint $table) {
                $table->char('org_main_setup_header_id', 10)->primary();

                $table->char('org_main_segment_id', 10)->nullable()->index();
                $table->char('org_main_department_id', 10)->nullable()->index();

                $table->date('effective_date')->nullable()->index();

                $table->timestamp('record_created')->nullable()->useCurrent();
                $table->timestamp('record_updated')->nullable()->useCurrent()->useCurrentOnUpdate();

                $table->index(
                    ['org_main_segment_id', 'org_main_department_id', 'effective_date'],
                    'org_main_setup_header_lookup_idx'
                );
            });
        }

        if (! Schema::hasTable('org_main_setup_detail')) {
            Schema::create('org_main_setup_detail', function (Blueprint $table) {
                $table->char('org_main_setup_detail_id', 10)->primary();

                $table->char('org_main_setup_header_id', 10)->index();

                // Boss sketch fields.
                $table->integer('org_main_setup_build_level')->default(1)->index();
                $table->integer('org_main_setup_build_order')->default(10)->index();

                // Flexible parent/child. Level is a label like DEPARTMENT, DIVISION, SECTION, TEAM, POSITION.
                $table->string('org_main_setup_parent_level', 16)->nullable()->index();
                $table->char('org_main_setup_parent_id', 10)->nullable()->index();

                $table->string('org_main_setup_child_level', 16)->index();
                $table->char('org_main_setup_child_id', 10)->index();

                $table->date('effective_date')->nullable()->index();

                $table->timestamp('record_created')->nullable()->useCurrent();
                $table->timestamp('record_updated')->nullable()->useCurrent()->useCurrentOnUpdate();

                $table->unique(
                    ['org_main_setup_header_id', 'org_main_setup_child_level', 'org_main_setup_child_id'],
                    'org_main_setup_detail_child_unique'
                );

                $table->index(
                    ['org_main_setup_header_id', 'org_main_setup_parent_level', 'org_main_setup_parent_id'],
                    'org_main_setup_detail_parent_idx'
                );

                $table->index(
                    ['org_main_setup_header_id', 'org_main_setup_build_level', 'org_main_setup_build_order'],
                    'org_main_setup_detail_order_idx'
                );
            });
        }
    }

    public function down(): void
    {
        // Safe no-op for production-like environment.
        // Do not auto-drop setup master tables.
    }
};
