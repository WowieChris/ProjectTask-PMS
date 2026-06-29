<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('org_chart_connectors')) {
            return;
        }

        Schema::create('org_chart_connectors', function (Blueprint $table) {
            $table->id();
            $table->string('chart_type', 50)->default('org');
            $table->string('department_id', 50)->nullable();
            $table->string('connector_id', 120);
            $table->string('source_node_id', 120);
            $table->string('target_node_id', 120);
            $table->string('source_handle', 80)->nullable();
            $table->string('target_handle', 80)->nullable();
            $table->string('connector_type', 50)->default('step');
            $table->json('connector_style')->nullable();
            $table->boolean('is_custom')->default(true);
            $table->boolean('active_yn')->default(true);
            $table->timestamps();

            $table->unique(['chart_type', 'department_id', 'connector_id'], 'org_chart_connectors_unique_key');
            $table->index(['chart_type', 'department_id', 'active_yn'], 'org_chart_connectors_lookup_idx');
            $table->index(['source_node_id', 'target_node_id'], 'org_chart_connectors_nodes_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('org_chart_connectors');
    }
};
