<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RiskAssessment;

class RiskAssessmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Risk descriptions mapping
        $riskDescriptions = [
            'M01' => 'Data Peti kemas tidak tercatat atau salah',
            'M02' => 'Penempatan peti kemas tidak sesuai',
            'M03' => 'Kerusakan alat bongkar muat',
            'M04' => 'Jadwal kapal tumpang tindih',
            'M05' => 'Kapal pandu tidak tersedia saat dibutuhkan',
            'M06' => 'Terlambatnya jadwal distribusi logistik',
            'M07' => 'Laporan tidak terkirim tepat waktu',
            'M08' => 'Data kapal dan peti kemas tidak sinkron',
            'M09' => 'Kecelakaan kerja saat bongkar muat',
            'M10' => 'Penundaan sandar dan bongkar muat akibat cuaca',
            'M11' => 'Rusaknya jalan pelabuhan atau dermaga',
            'M12' => 'Alat berat digunakan melebihi batas beban',
            'M13' => 'Penumpukan barang tidak rapi',
            'M14' => 'Overload penumpukan di lapangan peti kemas',
            'M15' => 'Terjadi salah komunikasi antara pandu & kapal',
            'M16' => 'Waktu sandar terlalu lama',
            'M17' => 'Barang tidak terpantau',
            'M18' => 'Barang salah kirim',
            'M19' => 'Perintah kerja tidak tersampaikan',
            'M20' => 'Informasi status kapal tidak seragam',
        ];

        // First 100 records from FMEA data
        $assessmentData = [
            // Subiyanto - Manajer Bistek Operasional (Records 1-20)
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M01', 'severity' => 6, 'occurrence' => 8, 'detection' => 6],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M02', 'severity' => 3, 'occurrence' => 6, 'detection' => 4],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M03', 'severity' => 9, 'occurrence' => 3, 'detection' => 3],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M04', 'severity' => 5, 'occurrence' => 8, 'detection' => 6],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M05', 'severity' => 5, 'occurrence' => 6, 'detection' => 3],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M06', 'severity' => 7, 'occurrence' => 7, 'detection' => 5],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M07', 'severity' => 5, 'occurrence' => 8, 'detection' => 4],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M08', 'severity' => 7, 'occurrence' => 7, 'detection' => 8],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M09', 'severity' => 10, 'occurrence' => 4, 'detection' => 6],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M10', 'severity' => 9, 'occurrence' => 8, 'detection' => 4],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M11', 'severity' => 6, 'occurrence' => 6, 'detection' => 5],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M12', 'severity' => 7, 'occurrence' => 5, 'detection' => 5],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M13', 'severity' => 5, 'occurrence' => 6, 'detection' => 4],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M14', 'severity' => 6, 'occurrence' => 6, 'detection' => 6],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M15', 'severity' => 6, 'occurrence' => 3, 'detection' => 5],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M16', 'severity' => 5, 'occurrence' => 7, 'detection' => 5],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M17', 'severity' => 5, 'occurrence' => 4, 'detection' => 5],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M18', 'severity' => 6, 'occurrence' => 3, 'detection' => 5],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M19', 'severity' => 5, 'occurrence' => 7, 'detection' => 4],
            ['name' => 'Subiyanto', 'job' => 'Manajer Bistek Operasional', 'code' => 'M20', 'severity' => 7, 'occurrence' => 8, 'detection' => 5],

            // Samabudi Giawa - Petugas Lapangan Operasional (Records 21-40)
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M01', 'severity' => 6, 'occurrence' => 7, 'detection' => 4],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M02', 'severity' => 3, 'occurrence' => 6, 'detection' => 5],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M03', 'severity' => 7, 'occurrence' => 4, 'detection' => 7],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M04', 'severity' => 7, 'occurrence' => 8, 'detection' => 2],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M05', 'severity' => 9, 'occurrence' => 7, 'detection' => 4],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M06', 'severity' => 8, 'occurrence' => 4, 'detection' => 3],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M07', 'severity' => 7, 'occurrence' => 5, 'detection' => 3],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M08', 'severity' => 6, 'occurrence' => 6, 'detection' => 8],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M09', 'severity' => 9, 'occurrence' => 4, 'detection' => 5],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M10', 'severity' => 5, 'occurrence' => 6, 'detection' => 5],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M11', 'severity' => 7, 'occurrence' => 6, 'detection' => 3],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M12', 'severity' => 4, 'occurrence' => 7, 'detection' => 2],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M13', 'severity' => 7, 'occurrence' => 5, 'detection' => 4],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M14', 'severity' => 5, 'occurrence' => 5, 'detection' => 5],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M15', 'severity' => 7, 'occurrence' => 3, 'detection' => 4],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M16', 'severity' => 5, 'occurrence' => 5, 'detection' => 6],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M17', 'severity' => 5, 'occurrence' => 4, 'detection' => 5],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M18', 'severity' => 7, 'occurrence' => 3, 'detection' => 4],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M19', 'severity' => 6, 'occurrence' => 7, 'detection' => 4],
            ['name' => 'Samabudi Giawa', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M20', 'severity' => 7, 'occurrence' => 7, 'detection' => 3],

            // Rosihin Anwar - Petugas Lapangan Operasional (Records 41-60)
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M01', 'severity' => 7, 'occurrence' => 8, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M02', 'severity' => 5, 'occurrence' => 4, 'detection' => 3],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M03', 'severity' => 8, 'occurrence' => 3, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M04', 'severity' => 6, 'occurrence' => 5, 'detection' => 6],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M05', 'severity' => 7, 'occurrence' => 8, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M06', 'severity' => 4, 'occurrence' => 9, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M07', 'severity' => 8, 'occurrence' => 5, 'detection' => 4],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M08', 'severity' => 8, 'occurrence' => 6, 'detection' => 3],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M09', 'severity' => 9, 'occurrence' => 5, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M10', 'severity' => 5, 'occurrence' => 6, 'detection' => 6],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M11', 'severity' => 7, 'occurrence' => 4, 'detection' => 2],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M12', 'severity' => 5, 'occurrence' => 5, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M13', 'severity' => 5, 'occurrence' => 6, 'detection' => 2],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M14', 'severity' => 6, 'occurrence' => 5, 'detection' => 2],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M15', 'severity' => 6, 'occurrence' => 5, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M16', 'severity' => 5, 'occurrence' => 6, 'detection' => 4],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M17', 'severity' => 5, 'occurrence' => 5, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M18', 'severity' => 7, 'occurrence' => 4, 'detection' => 2],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M19', 'severity' => 6, 'occurrence' => 6, 'detection' => 5],
            ['name' => 'Rosihin Anwar', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M20', 'severity' => 6, 'occurrence' => 7, 'detection' => 4],

            // Abner Sitompul - Petugas Lapangan Operasional (Records 61-80)
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M01', 'severity' => 6, 'occurrence' => 7, 'detection' => 2],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M02', 'severity' => 4, 'occurrence' => 4, 'detection' => 2],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M03', 'severity' => 7, 'occurrence' => 3, 'detection' => 5],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M04', 'severity' => 5, 'occurrence' => 4, 'detection' => 4],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M05', 'severity' => 7, 'occurrence' => 6, 'detection' => 4],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M06', 'severity' => 4, 'occurrence' => 3, 'detection' => 4],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M07', 'severity' => 5, 'occurrence' => 6, 'detection' => 3],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M08', 'severity' => 7, 'occurrence' => 6, 'detection' => 3],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M09', 'severity' => 8, 'occurrence' => 4, 'detection' => 2],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M10', 'severity' => 6, 'occurrence' => 5, 'detection' => 2],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M11', 'severity' => 5, 'occurrence' => 2, 'detection' => 2],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M12', 'severity' => 5, 'occurrence' => 5, 'detection' => 2],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M13', 'severity' => 3, 'occurrence' => 7, 'detection' => 2],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M14', 'severity' => 4, 'occurrence' => 6, 'detection' => 2],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M15', 'severity' => 6, 'occurrence' => 4, 'detection' => 4],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M16', 'severity' => 6, 'occurrence' => 6, 'detection' => 5],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M17', 'severity' => 6, 'occurrence' => 6, 'detection' => 5],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M18', 'severity' => 6, 'occurrence' => 4, 'detection' => 4],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M19', 'severity' => 5, 'occurrence' => 7, 'detection' => 5],
            ['name' => 'Abner Sitompul', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M20', 'severity' => 6, 'occurrence' => 7, 'detection' => 4],

            // Hottand Hutagalung - Petugas Lapangan Operasional (Records 81-100)
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M01', 'severity' => 7, 'occurrence' => 6, 'detection' => 5],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M02', 'severity' => 3, 'occurrence' => 4, 'detection' => 1],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M03', 'severity' => 6, 'occurrence' => 3, 'detection' => 4],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M04', 'severity' => 6, 'occurrence' => 5, 'detection' => 5],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M05', 'severity' => 7, 'occurrence' => 6, 'detection' => 4],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M06', 'severity' => 3, 'occurrence' => 6, 'detection' => 5],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M07', 'severity' => 8, 'occurrence' => 8, 'detection' => 2],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M08', 'severity' => 8, 'occurrence' => 8, 'detection' => 2],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M09', 'severity' => 10, 'occurrence' => 4, 'detection' => 5],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M10', 'severity' => 6, 'occurrence' => 7, 'detection' => 2],
            ['name' => 'Hottand Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M11', 'severity' => 4, 'occurrence' => 4, 'detection' => 1],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M12', 'severity' => 5, 'occurrence' => 5, 'detection' => 2],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M13', 'severity' => 4, 'occurrence' => 5, 'detection' => 3],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M14', 'severity' => 5, 'occurrence' => 5, 'detection' => 3],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M15', 'severity' => 6, 'occurrence' => 5, 'detection' => 4],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M16', 'severity' => 5, 'occurrence' => 5, 'detection' => 5],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M17', 'severity' => 5, 'occurrence' => 6, 'detection' => 4],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M18', 'severity' => 6, 'occurrence' => 4, 'detection' => 4],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M19', 'severity' => 5, 'occurrence' => 7, 'detection' => 3],
            ['name' => 'Hotland Hutagalung', 'job' => 'Petugas Lapangan Operasional', 'code' => 'M20', 'severity' => 6, 'occurrence' => 7, 'detection' => 4],
        ];

        // Create assessments
        foreach ($assessmentData as $data) {
            RiskAssessment::create([
                'respondent_name' => $data['name'],
                'respondent_job' => $data['job'],
                'risk_code' => $data['code'],
                'risk_description' => $riskDescriptions[$data['code']],
                'severity' => $data['severity'],
                'occurrence' => $data['occurrence'],
                'detection' => $data['detection'],
            ]);
        }
    }
}
