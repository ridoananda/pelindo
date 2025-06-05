<?php

namespace App\Exports;

use App\Models\Logistic;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping; // Optional: for transforming data

class LogisticReportExport implements FromCollection, WithHeadings, ShouldAutoSize, WithMapping
{
    protected $logistics;

    public function __construct($logistics)
    {
        $this->logistics = $logistics;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->logistics;
    }

    /**
    * @param mixed $logistic
    * @return array
    */
    public function map($logistic): array
    {
        // Sesuaikan dengan field sebenarnya dari model Logistic Anda
        return [
            $logistic->id,
            $logistic->name,       // Asumsi 'name' adalah 'Nama Barang'
            $logistic->category,   // Asumsi 'category' adalah 'Kategori'
            $logistic->date ? \Carbon\Carbon::parse($logistic->date)->setTimezone('Asia/Jakarta')->format('Y-m-d') : '', // Format tanggal WIB
            $logistic->status,
            $logistic->created_at ? $logistic->created_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
            $logistic->updated_at ? $logistic->updated_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
        ];
    }

    public function headings(): array
    {
        // Header dalam bahasa Indonesia sesuai dengan model Logistic
        return [
            'ID',
            'Nama Item',
            'Kategori',
            'Tanggal',
            'Status',
            'Dibuat Pada',
            'Diperbarui Pada',
        ];
    }
} 