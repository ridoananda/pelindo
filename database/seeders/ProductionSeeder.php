<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productions = [
            [
                'production_date' => '2025-05-06',
                'production_type' => 'Import',
                'grain_type' => 'Beras',
                'grain_weight' => 5000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'production_date' => '2025-05-07',
                'production_type' => 'Export',
                'grain_type' => 'Kopi',
                'grain_weight' => 1200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'production_date' => '2025-05-08',
                'production_type' => 'Import',
                'grain_type' => 'Jagung',
                'grain_weight' => 3500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'production_date' => '2025-05-09',
                'production_type' => 'Import',
                'grain_type' => 'Gandum',
                'grain_weight' => 8000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'production_date' => '2025-05-09',
                'production_type' => 'Export',
                'grain_type' => 'Kedelai',
                'grain_weight' => 2500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'production_date' => '2025-05-10',
                'production_type' => 'Export',
                'grain_type' => 'Kakao',
                'grain_weight' => 1800,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'production_date' => '2025-05-11',
                'production_type' => 'Import',
                'grain_type' => 'Gula',
                'grain_weight' => 4500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('productions')->insert($productions);
    }
}
