<?php

namespace App\Exports;

use App\Models\CargoActivity;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class CargoActivityExport implements FromCollection, WithHeadings, ShouldAutoSize, WithMapping
{
    protected $cargoActivities;

    public function __construct($cargoActivities)
    {
        $this->cargoActivities = $cargoActivities;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->cargoActivities;
    }

    /**
    * @param mixed $cargoActivity
    * @return array
    */
    public function map($cargoActivity): array
    {
        return [
            $cargoActivity->id,
            $cargoActivity->ship_name,
            $cargoActivity->type,
            $cargoActivity->cargo_type,
            $cargoActivity->quantity,
            $cargoActivity->unit,
            $cargoActivity->operator,
            $cargoActivity->time ? \Carbon\Carbon::parse($cargoActivity->time)->setTimezone('Asia/Jakarta')->format('Y-m-d H:i') : '',
            $cargoActivity->status,
            $cargoActivity->notes,
            $cargoActivity->created_at ? $cargoActivity->created_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
            $cargoActivity->updated_at ? $cargoActivity->updated_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') . ' WIB' : '',
        ];
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nama Kapal',
            'Jenis Aktivitas',
            'Jenis Kargo',
            'Kuantitas',
            'Unit',
            'Operator',
            'Waktu',
            'Status',
            'Catatan',
            'Dibuat Pada',
            'Diperbarui Pada',
        ];
    }
}
