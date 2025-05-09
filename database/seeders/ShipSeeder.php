<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ships = [
            [
                'name' => 'KM Bukit Raya',
                'type' => 'Kapal Penumpang',
                'cargo' => 'Penumpang dan Kendaraan',
                'departure_time' => '14:30:00',
                'arrival_time' => '08:15:00',
                'status' => 'Berlabuh',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'KM Labobar',
                'type' => 'Kapal Penumpang',
                'cargo' => 'Penumpang dan Kendaraan',
                'departure_time' => '18:00:00',
                'arrival_time' => '07:30:00',
                'status' => 'Berlayar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'MT Pertamina Gas 1',
                'type' => 'Kapal Tanker',
                'cargo' => 'Gas LNG',
                'departure_time' => '09:45:00',
                'arrival_time' => '16:20:00',
                'status' => 'Bongkar Muat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'MV Meratus Sibolga',
                'type' => 'Kapal Kontainer',
                'cargo' => 'Kontainer',
                'departure_time' => '22:00:00',
                'arrival_time' => '05:45:00',
                'status' => 'Menunggu',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'KM Dharma Ferry IX',
                'type' => 'Kapal Ferry',
                'cargo' => 'Penumpang dan Kendaraan',
                'departure_time' => '16:30:00',
                'arrival_time' => '06:00:00',
                'status' => 'Berlabuh',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'MV Tanto Express',
                'type' => 'Kapal Kargo',
                'cargo' => 'Barang Umum',
                'departure_time' => '23:15:00',
                'arrival_time' => '14:30:00',
                'status' => 'Bongkar Muat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'TB Sinar Nias',
                'type' => 'Kapal Tunda',
                'cargo' => 'Tidak Ada',
                'departure_time' => '10:00:00',
                'arrival_time' => '18:45:00',
                'status' => 'Beroperasi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('ships')->insert($ships);
    }
}
