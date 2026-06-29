<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /*
         * Phase 1 only:
         * - Create missing boss-schema tables.
         * - Add missing nullable/safe columns.
         * - No data migration.
         * - No changes to org_position hierarchy.
         */

        if (! Schema::hasColumn('designation', 'designation_type')) {
            Schema::table('designation', function (Blueprint $table) {
                $table->string('designation_type', 50)->nullable()->after('designation_level');
            });
        }

        if (! Schema::hasColumn('emp_desig_setup', 'tech_group_yn')) {
            Schema::table('emp_desig_setup', function (Blueprint $table) {
                $table->boolean('tech_group_yn')->default(false)->after('designation_id');
            });
        }

        if (! Schema::hasTable('org_main_desig_setup')) {
            Schema::create('org_main_desig_setup', function (Blueprint $table) {
                $table->string('org_main_desig_setup_id', 20)->primary();
                $table->string('org_main_designation_id', 20)->nullable();
                $table->string('org_emp_desig_id', 20)->nullable();
                $table->integer('org_main_desig_build_level')->nullable();
                $table->integer('org_main_desig_build_column')->nullable();
                $table->date('effective_date')->nullable();
                $table->dateTime('record_created')->nullable();
                $table->dateTime('record_updated')->nullable();

                $table->index('org_main_designation_id', 'omds_designation_idx');
                $table->index('org_emp_desig_id', 'omds_emp_desig_idx');
                $table->index('effective_date', 'omds_effective_date_idx');
            });
        }

        if (! Schema::hasTable('org_office_address_setup')) {
            Schema::create('org_office_address_setup', function (Blueprint $table) {
                $table->string('org_office_address_setup_id', 20)->primary();
                $table->string('org_office_segment', 30)->nullable();
                $table->string('org_office_code', 50)->nullable();
                $table->string('org_office_id', 20)->nullable();
                $table->string('org_office_address_1', 255)->nullable();
                $table->string('org_office_address_2', 255)->nullable();
                $table->string('org_office_region', 100)->nullable();
                $table->string('org_office_municipality', 100)->nullable();
                $table->string('org_office_city', 100)->nullable();
                $table->string('org_office_barangay', 100)->nullable();
                $table->string('org_office_postal_code', 20)->nullable();
                $table->date('effective_date')->nullable();
                $table->dateTime('record_created')->nullable();
                $table->dateTime('record_updated')->nullable();

                $table->index(['org_office_segment', 'org_office_id'], 'office_address_segment_id_idx');
                $table->index('org_office_code', 'office_address_code_idx');
            });
        }

        if (! Schema::hasTable('tech_support_group')) {
            Schema::create('tech_support_group', function (Blueprint $table) {
                $table->string('tech_support_group_id', 20)->primary();
                $table->string('tech_support_group_code', 50)->nullable();
                $table->string('tech_support_group_name', 150)->nullable();
                $table->string('tech_support_section', 150)->nullable();
                $table->text('description')->nullable();
                $table->boolean('active_yn')->default(true);
                $table->dateTime('record_created')->nullable();
                $table->dateTime('record_updated')->nullable();

                $table->index('tech_support_group_code', 'tsg_code_idx');
                $table->index('active_yn', 'tsg_active_idx');
            });
        }

        if (! Schema::hasTable('tech_support_group_setup')) {
            Schema::create('tech_support_group_setup', function (Blueprint $table) {
                $table->string('tech_support_group_setup_id', 20)->primary();
                $table->string('tech_support_group_id', 20)->nullable();
                $table->string('emp_desig_setup_id', 20)->nullable();
                $table->integer('tech_support_level_no')->nullable();
                $table->string('tech_support_level_name', 100)->nullable();
                $table->boolean('tech_group_yn')->default(false);
                $table->date('effective_date')->nullable();
                $table->dateTime('record_created')->nullable();
                $table->dateTime('record_updated')->nullable();

                $table->index('tech_support_group_id', 'tsgs_group_idx');
                $table->index('emp_desig_setup_id', 'tsgs_emp_desig_idx');
                $table->index('tech_support_level_no', 'tsgs_level_idx');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('emp_desig_setup', 'tech_group_yn')) {
            Schema::table('emp_desig_setup', function (Blueprint $table) {
                $table->dropColumn('tech_group_yn');
            });
        }

        if (Schema::hasColumn('designation', 'designation_type')) {
            Schema::table('designation', function (Blueprint $table) {
                $table->dropColumn('designation_type');
            });
        }

        Schema::dropIfExists('tech_support_group_setup');
        Schema::dropIfExists('tech_support_group');
        Schema::dropIfExists('org_office_address_setup');
        Schema::dropIfExists('org_main_desig_setup');
    }
};
