<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Wowie Chris Haberly',
            'email' => 'haberly.wowiechris@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'location' => 'Luzon',
        ]);
    }
}
