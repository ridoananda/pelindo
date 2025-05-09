<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CargoActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cargoActivities = [
            [
                'ship_name' => 'MV Meratus Sibolga',
                'type' => 'Bongkar',
                'quantity' => '230 TEU',
                'operator' => 'PT Meratus Line',
                'time' => '08:30:00',
                'status' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MT Pertamina Gas 1',
                'type' => 'Bongkar',
                'quantity' => '15000 MT LNG',
                'operator' => 'PT Pertamina',
                'time' => '10:15:00',
                'status' => 'Dalam proses',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MV Tanto Express',
                'type' => 'Muat',
                'quantity' => '180 TEU',
                'operator' => 'PT Tanto Intim Line',
                'time' => '14:45:00',
                'status' => 'Dalam proses',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'KM Dharma Ferry IX',
                'type' => 'Bongkar',
                'quantity' => '45 Kendaraan, 250 Penumpang',
                'operator' => 'PT Dharma Lautan Utama',
                'time' => '16:00:00',
                'status' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MV Mentari Success',
                'type' => 'Muat',
                'quantity' => '2500 Ton Batubara',
                'operator' => 'PT Mentari Line',
                'time' => '07:30:00',
                'status' => 'Tertunda atau bermasalah',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'KM Bukit Raya',
                'type' => 'Bongkar',
                'quantity' => '50 Kendaraan, 320 Penumpang',
                'operator' => 'PT Pelni',
                'time' => '09:00:00',
                'status' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MV Sinar Sumba',
                'type' => 'Muat',
                'quantity' => '320 TEU',
                'operator' => 'PT Samudera Indonesia',
                'time' => '11:30:00',
                'status' => 'Dalam proses',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('cargo_activities')->insert($cargoActivities);
    }
}
