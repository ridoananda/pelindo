<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LogisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $logistics = [
            [
                'name' => 'Semen Padang',
                'category' => 'Bahan Bangunan',
                'date' => '2025-05-05',
                'status' => 'Masuk',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Beras Bulog',
                'category' => 'Bahan Pokok',
                'date' => '2025-05-07',
                'status' => 'Masuk',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Minyak Goreng',
                'category' => 'Bahan Pokok',
                'date' => '2025-05-09',
                'status' => 'Masuk',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pupuk NPK',
                'category' => 'Pertanian',
                'date' => '2025-05-10',
                'status' => 'Keluar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kayu Gelondongan',
                'category' => 'Hasil Hutan',
                'date' => '2025-05-11',
                'status' => 'Keluar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Baja Ringan',
                'category' => 'Bahan Bangunan',
                'date' => '2025-05-12',
                'status' => 'Masuk',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Elektronik',
                'category' => 'Barang Konsumsi',
                'date' => '2025-05-13',
                'status' => 'Masuk',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Karet Mentah',
                'category' => 'Hasil Perkebunan',
                'date' => '2025-05-14',
                'status' => 'Keluar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('logistics')->insert($logistics);
    }
}
