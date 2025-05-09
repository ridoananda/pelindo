<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RiskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $risks = [
            [
                'type' => 'Cuaca Buruk',
                'impact' => 'Penundaan Pelayaran',
                'status' => 'Sedang',
                'recommendation' => 'Pantau kondisi cuaca setiap jam dan koordinasi dengan BMKG untuk update kondisi terkini',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'Kerusakan Crane',
                'impact' => 'Terhambatnya Bongkar Muat',
                'status' => 'Tinggi',
                'recommendation' => 'Lakukan maintenance berkala dan sediakan suku cadang yang cukup untuk perbaikan cepat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'Penumpukan Kontainer',
                'impact' => 'Keterbatasan Area Penyimpanan',
                'status' => 'Rendah',
                'recommendation' => 'Koordinasi jadwal pengambilan kontainer dengan pemilik barang dan optimalkan area penyimpanan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'Kebakaran Kapal',
                'impact' => 'Kerusakan Aset dan Korban Jiwa',
                'status' => 'Tinggi',
                'recommendation' => 'Pastikan sistem pemadam kebakaran berfungsi dan lakukan simulasi keadaan darurat secara rutin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'Tumpahan Minyak',
                'impact' => 'Pencemaran Laut',
                'status' => 'Sedang',
                'recommendation' => 'Siapkan peralatan penanggulangan dan tim tanggap darurat untuk menangani tumpahan dengan cepat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'Kemacetan Pelabuhan',
                'impact' => 'Penundaan Operasional',
                'status' => 'Sedang',
                'recommendation' => 'Implementasikan sistem manajemen antrean kapal yang lebih efisien dan koordinasi dengan semua pihak terkait',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('risks')->insert($risks);
    }
}
