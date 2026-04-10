<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('division_engineers') && ! Schema::hasTable('user_group_engineers')) {
            Schema::rename('division_engineers', 'user_group_engineers');
        }

        if (Schema::hasTable('user_group_engineers') && ! Schema::hasColumn('user_group_engineers', 'user_group_id')) {
            Schema::table('user_group_engineers', function (Blueprint $table) {
                $table->foreignId('user_group_id')
                    ->after('division_id')
                    ->nullable()
                    ->constrained('user_groups')
                    ->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('user_group_engineers') && Schema::hasColumn('user_group_engineers', 'user_group_id')) {
            Schema::table('user_group_engineers', function (Blueprint $table) {
                $table->dropForeign(['user_group_id']);
                $table->dropColumn('user_group_id');
            });
        }

        if (Schema::hasTable('user_group_engineers') && ! Schema::hasTable('division_engineers')) {
            Schema::rename('user_group_engineers', 'division_engineers');
        }
    }
};
