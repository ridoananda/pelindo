<?php

namespace App\Exports;

use App\Models\Ship;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class ShipReportExport implements FromCollection, WithHeadings, ShouldAutoSize, WithMapping
{
    protected $ships;

    public function __construct($ships)
    {
        $this->ships = $ships;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->ships;
    }

    /**
    * @param mixed $ship
    * @return array
    */
    public function map($ship): array
    {
        // Sesuaikan dengan field sebenarnya dari model Ship Anda
        return [
            $ship->id,
            $ship->name, // Asumsi 'name' adalah 'Nama Kapal'
            $ship->type,
            $ship->cargo,
            $ship->departure_time ? \Carbon\Carbon::parse($ship->departure_time)->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
            $ship->arrival_time ? \Carbon\Carbon::parse($ship->arrival_time)->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
            $ship->status,
            // Tambahkan field lain yang relevan dari model Ship Anda
            $ship->created_at ? $ship->created_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
            $ship->updated_at ? $ship->updated_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
        ];
    }

    public function headings(): array
    {
        // Header dalam bahasa Indonesia sesuai dengan model Ship
        return [
            'ID',
            'Nama Kapal',
            'Jenis',
            'Kargo',
            'Waktu Keberangkatan',
            'Waktu Kedatangan',
            'Status',
            // Tambahkan header lain yang relevan
            'Dibuat Pada',
            'Diperbarui Pada',
        ];
    }
} 