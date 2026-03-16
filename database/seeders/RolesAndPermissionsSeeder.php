<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // create permissions
        $permissions = [
            'create_user',
            'edit_user',
            'delete_user',
            'view_users',
            'create_service_order',
            'update_service_order',
            'delete_service_order',
            'view_service_order'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // create admin role
        $admin = Role::firstOrCreate(['name' => 'admin']);

        // give permissions to admin
        $admin->givePermissionTo($permissions);
    }
}
