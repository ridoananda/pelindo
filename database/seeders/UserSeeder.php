<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin Operator',
            'email' => 'admin@pelabuhan.com',
            'password' => Hash::make('password'),
            'role' => 'operator',
        ]);

        User::create([
            'name' => 'Staff Operator',
            'email' => 'operator@pelabuhan.com',
            'password' => Hash::make('password'),
            'role' => 'operator',
        ]);

        User::create([
            'name' => 'Manager Pelabuhan',
            'email' => 'manager@pelabuhan.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
        ]);
    }
}
