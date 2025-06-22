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
                'cargo_type' => 'Kontainer',
                'quantity' => '230',
                'unit' => 'TEUs',
                'operator' => 'PT Meratus Line',
                'time' => '08:30:00',
                'status' => 'Selesai',
                'notes' => 'Proses bongkar kontainer selesai tepat waktu',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MT Pertamina Gas 1',
                'type' => 'Bongkar',
                'cargo_type' => 'LNG',
                'quantity' => '15000',
                'unit' => 'Ton',
                'operator' => 'PT Pertamina',
                'time' => '10:15:00',
                'status' => 'Dalam Proses',
                'notes' => 'Proses bongkar LNG sedang berlangsung',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MV Tanto Express',
                'type' => 'Muat',
                'cargo_type' => 'Kontainer',
                'quantity' => '180',
                'unit' => 'TEUs',
                'operator' => 'PT Tanto Intim Line',
                'time' => '14:45:00',
                'status' => 'Dalam Proses',
                'notes' => 'Pemuatan kontainer untuk ekspor',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'KM Dharma Ferry IX',
                'type' => 'Bongkar',
                'cargo_type' => 'Kendaraan & Penumpang',
                'quantity' => '45',
                'unit' => 'Unit',
                'operator' => 'PT Dharma Lautan Utama',
                'time' => '16:00:00',
                'status' => 'Selesai',
                'notes' => '45 kendaraan dan 250 penumpang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MV Mentari Success',
                'type' => 'Muat',
                'cargo_type' => 'Batubara',
                'quantity' => '2500',
                'unit' => 'Ton',
                'operator' => 'PT Mentari Line',
                'time' => '07:30:00',
                'status' => 'Tertunda',
                'notes' => 'Pemuatan tertunda karena cuaca buruk',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'KM Bukit Raya',
                'type' => 'Bongkar',
                'cargo_type' => 'Kendaraan & Penumpang',
                'quantity' => '50',
                'unit' => 'Unit',
                'operator' => 'PT Pelni',
                'time' => '09:00:00',
                'status' => 'Selesai',
                'notes' => '50 kendaraan dan 320 penumpang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MV Sinar Sumba',
                'type' => 'Muat',
                'cargo_type' => 'Kontainer',
                'quantity' => '320',
                'unit' => 'TEUs',
                'operator' => 'PT Samudera Indonesia',
                'time' => '11:30:00',
                'status' => 'Dalam Proses',
                'notes' => 'Pemuatan kontainer ekspor ke Jakarta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ship_name' => 'MV Cargo Pioneer',
                'type' => 'Bongkar',
                'cargo_type' => 'Curah Kering',
                'quantity' => '5000',
                'unit' => 'Ton',
                'operator' => 'PT Pioneer Shipping',
                'time' => '13:00:00',
                'status' => 'Dibatalkan',
                'notes' => 'Dibatalkan karena masalah teknis kapal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('cargo_activities')->insert($cargoActivities);
    }
}
