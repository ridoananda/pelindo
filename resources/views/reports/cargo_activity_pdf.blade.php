<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $reportType }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 15px;
        }
        .header h1 {
            color: #007bff;
            margin: 0 0 10px 0;
            font-size: 24px;
        }
        .header p {
            margin: 5px 0;
            color: #666;
        }
        .summary {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
        }
        .summary-item {
            text-align: center;
            flex: 1;
        }
        .summary-item h3 {
            color: #007bff;
            margin: 0 0 5px 0;
            font-size: 18px;
        }
        .summary-item p {
            margin: 0;
            font-size: 11px;
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 10px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .status {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }
        .status.selesai {
            background-color: #d4edda;
            color: #155724;
        }
        .status.proses {
            background-color: #fff3cd;
            color: #856404;
        }
        .status.pending {
            background-color: #f8d7da;
            color: #721c24;
        }
        .type {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }
        .type.bongkar {
            background-color: #d1ecf1;
            color: #0c5460;
        }
        .type.muat {
            background-color: #d4edda;
            color: #155724;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        .no-data {
            text-align: center;
            padding: 40px;
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $reportType }}</h1>
        <p><strong>Periode:</strong> {{ $reportPeriod }}</p>
        <p><strong>Tanggal Laporan:</strong> {{ $reportDate }}</p>
    </div>

    @php
        $totalActivities = $cargoActivities->count();
        $bongkarCount = $cargoActivities->where('type', 'bongkar')->count();
        $muatCount = $cargoActivities->where('type', 'muat')->count();
        $selesaiCount = $cargoActivities->where('status', 'selesai')->count();
    @endphp

    <div class="summary">
        <div class="summary-item">
            <h3>{{ $totalActivities }}</h3>
            <p>Total Aktivitas</p>
        </div>
        <div class="summary-item">
            <h3>{{ $bongkarCount }}</h3>
            <p>Aktivitas Bongkar</p>
        </div>
        <div class="summary-item">
            <h3>{{ $muatCount }}</h3>
            <p>Aktivitas Muat</p>
        </div>
        <div class="summary-item">
            <h3>{{ $selesaiCount }}</h3>
            <p>Aktivitas Selesai</p>
        </div>
    </div>

    @if($cargoActivities->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Kapal</th>
                    <th>Jenis</th>
                    <th>Jenis Kargo</th>
                    <th>Kuantitas</th>
                    <th>Unit</th>
                    <th>Operator</th>
                    <th>Waktu</th>
                    <th>Status</th>
                    <th>Catatan</th>
                </tr>
            </thead>
            <tbody>
                @foreach($cargoActivities as $index => $activity)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $activity->ship_name }}</td>
                    <td>
                        <span class="type {{ $activity->type }}">
                            {{ ucfirst($activity->type) }}
                        </span>
                    </td>
                    <td>{{ $activity->cargo_type }}</td>
                    <td style="text-align: right;">{{ number_format($activity->quantity) }}</td>
                    <td>{{ $activity->unit }}</td>
                    <td>{{ $activity->operator }}</td>
                    <td>{{ $activity->time ? \Carbon\Carbon::parse($activity->time)->setTimezone('Asia/Jakarta')->format('d/m/Y H:i') : '-' }}</td>
                    <td>
                        <span class="status {{ $activity->status }}">
                            {{ ucfirst($activity->status) }}
                        </span>
                    </td>
                    <td>{{ $activity->notes ? (strlen($activity->notes) > 30 ? substr($activity->notes, 0, 30) . '...' : $activity->notes) : '-' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <div class="no-data">
            <p>Tidak ada data aktivitas bongkar muat untuk periode ini.</p>
        </div>
    @endif

    <div class="footer">
        <p>Laporan ini dibuat secara otomatis oleh Sistem Manajemen Pelabuhan</p>
        <p>Dicetak pada: {{ now()->setTimezone('Asia/Jakarta')->format('d F Y, H:i') }} WIB</p>
    </div>
</body>
</html>
