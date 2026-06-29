<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('org_standard_position_map')) {
            return;
        }

        Schema::create('org_standard_position_map', function (Blueprint $table) {
            $table->char('org_standard_position_map_id', 10)->primary();

            // Approved standard setup container.
            $table->char('org_main_setup_header_id', 10);

            // Standard layout node from org_main_setup_detail.
            // Example: Department / Division / Section / Team node.
            $table->char('org_main_setup_detail_id', 10)->nullable();

            // Actual assignable position.
            $table->char('org_position_id', 10);

            // Optional parent position for position tree rendering.
            $table->char('parent_org_position_id', 10)->nullable();

            // Build layer/column for visual rendering.
            $table->unsignedTinyInteger('build_level')->nullable();
            $table->unsignedSmallInteger('build_column')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);

            // lead = main node/parent position, child = child position, assistant = direct assistant under head.
            $table->string('map_role', 30)->default('child');

            $table->date('effective_date')->nullable();
            $table->boolean('active_yn')->default(true);
            $table->timestamp('record_created')->nullable();
            $table->timestamp('record_updated')->nullable();

            $table->unique(['org_main_setup_header_id', 'org_position_id'], 'ospm_header_position_unique');
            $table->index(['org_main_setup_header_id', 'build_level', 'build_column'], 'ospm_layout_idx');
            $table->index('org_main_setup_detail_id', 'ospm_detail_idx');
            $table->index('parent_org_position_id', 'ospm_parent_position_idx');
        });
    }

    public function down(): void
    {
        // Safe rollback policy for this project:
        // do not auto-drop structure/mapping data.
    }
};
