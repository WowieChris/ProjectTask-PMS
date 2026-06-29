<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('org_position_layouts')) {
            Schema::create('org_position_layouts', function (Blueprint $table) {
                $table->id();
                $table->char('department_id', 10)->index();
                $table->char('org_position_id', 10)->index();
                $table->decimal('x_position', 12, 2);
                $table->decimal('y_position', 12, 2);
                $table->timestamps();

                $table->unique(['department_id', 'org_position_id'], 'org_pos_layout_dept_pos_unique');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('org_position_layouts');
    }
};
