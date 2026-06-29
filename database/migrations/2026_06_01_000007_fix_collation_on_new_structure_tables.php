<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private array $tables = [
        'designation_levels',
        'designation_types',
        'org_function_areas',
        'org_function_sections',
        'org_function_groups',
    ];

    public function up(): void
    {
        foreach ($this->tables as $table) {
            DB::statement(
                "ALTER TABLE `{$table}` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
            );
        }

        // The two columns added to org_position inherit the table collation already,
        // but ensure they stay consistent if the table was somehow mixed.
        DB::statement(
            'ALTER TABLE `org_position`
             MODIFY COLUMN `designation_type_id` CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
             MODIFY COLUMN `function_group_id`   CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL'
        );
    }

    public function down(): void
    {
        foreach ($this->tables as $table) {
            DB::statement(
                "ALTER TABLE `{$table}` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci"
            );
        }
    }
};
