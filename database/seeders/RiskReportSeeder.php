<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RiskReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $riskReports = [
            [
                'report_date' => '2025-05-07',
                'risk_type' => 'Cuaca Buruk',
                'description' => 'Gelombang tinggi sebesar 2-3 meter pada Laut Tapanuli mengakibatkan penundaan keberangkatan 3 kapal selama 24 jam.',
                'recommended_action' => 'Perbaharui sistem peringatan dini cuaca dan koordinasi lebih intensif dengan BMKG',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'report_date' => '2025-05-08',
                'risk_type' => 'Kerusakan Crane',
                'description' => 'Crane nomor 2 mengalami kerusakan pada sistem hidrolik saat bongkar muat kontainer dari MV Meratus Sibolga.',
                'recommended_action' => 'Percepat jadwal maintenance rutin dan upgrade peralatan crane yang sudah berusia lebih dari 10 tahun',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'report_date' => '2025-05-09',
                'risk_type' => 'Penumpukan Kontainer',
                'description' => 'Area penyimpanan kontainer Blok C mencapai 85% kapasitas maksimum akibat keterlambatan pengambilan oleh pemilik barang.',
                'recommended_action' => 'Implementasikan sistem notifikasi otomatis dan terapkan biaya tambahan untuk keterlambatan pengambilan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'report_date' => '2025-05-09',
                'risk_type' => 'Tumpahan Minyak',
                'description' => 'Terdeteksi tumpahan minyak skala kecil di area dermaga 3 saat proses pengisian bahan bakar.',
                'recommended_action' => 'Perketat prosedur pengisian bahan bakar dan tingkatkan kompetensi petugas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'report_date' => '2025-05-10',
                'risk_type' => 'Kemacetan Pelabuhan',
                'description' => 'Terjadi kemacetan arus masuk kapal akibat bersamaannya jadwal kedatangan 4 kapal kargo pada waktu yang berdekatan.',
                'recommended_action' => 'Tingkatkan koordinasi penjadwalan dan optimalisasi alur keluar-masuk pelabuhan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'report_date' => '2025-05-11',
                'risk_type' => 'Kebakaran Kapal',
                'description' => 'Simulasi kejadian kebakaran pada kapal menunjukkan respon yang kurang cepat dan koordinasi tim pemadam yang belum optimal.',
                'recommended_action' => 'Tingkatkan frekuensi pelatihan dan perbaiki sistem komunikasi darurat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('risk_reports')->insert($riskReports);
    }
}
