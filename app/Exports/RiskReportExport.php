<?php

namespace App\Exports;

use App\Models\Risk;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class RiskReportExport implements FromCollection, WithHeadings, ShouldAutoSize, WithMapping
{
    protected $risks;

    public function __construct($risks)
    {
        $this->risks = $risks;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->risks;
    }

    /**
    * @param mixed $risk
    * @return array
    */
    public function map($risk): array
    {
        // Sesuaikan dengan field sebenarnya dari model Risk Anda
        // Halaman Risk.jsx menampilkan kolom: Jenis Risiko, Dampak, Status, Rekomendasi
        // Dan untuk 'Laporan Insiden Risiko': Tanggal Laporan, Jenis Risiko, Deskripsi, Tindakan yang Direkomendasikan
        // Kelas export ini akan menghasilkan daftar risiko yang sederhana. Anda mungkin perlu dua export terpisah
        // atau struktur yang lebih kompleks jika perlu merepresentasikan kedua tabel dari Risk.jsx secara berbeda.
        return [
            $risk->id,
            $risk->type,
            $risk->impact,
            $risk->status,
            $risk->recommendation,
            $risk->created_at ? $risk->created_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
            $risk->updated_at ? $risk->updated_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
        ];
    }

    public function headings(): array
    {
        // Header dalam bahasa Indonesia sesuai dengan model Risk
        return [
            'ID',
            'Jenis Risiko',
            'Dampak',
            'Tingkat Risiko',
            'Rekomendasi',
            'Dibuat Pada',
            'Diperbarui Pada',
        ];
    }
}
