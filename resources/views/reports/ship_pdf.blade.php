<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $reportType ?? 'Laporan Aktivitas Kapal' }}</title>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; margin: 20px; font-size: 12px; }
        h1 { text-align: center; margin-bottom: 5px; font-size: 1.5em; }
        h3 { text-align: center; margin-top: 0px; margin-bottom: 15px; font-weight: normal; font-size: 1.1em; }
        .meta-info { margin-bottom: 20px; font-size: 0.9em; border-bottom: 1px solid #eee; padding-bottom: 10px;}
        .meta-info p { margin: 3px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.9em;}
        th, td { border: 1px solid #333333; padding: 6px 8px; text-align: left; word-wrap: break-word; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .footer { margin-top: 30px; text-align: right; font-size:0.8em; color: #666666; }
        .no-data { text-align: center; padding: 20px; font-style: italic; color: #666666; }
    </style>
</head>
<body>
    <h1>{{ $reportType ?? 'Laporan Aktivitas Kapal' }}</h1>
    <h3>Periode: {{ $reportPeriod ?? 'N/A' }}</h3>

    <div class="meta-info">
        <p><strong>Tanggal Laporan:</strong> {{ $reportDate ?? now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Nama Kapal</th>
                <th>Jenis</th>
                <th>Kargo</th>
                <th>Waktu Keberangkatan</th>
                <th>Waktu Kedatangan</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($ships as $ship)
            <tr>
                <td>{{ $ship->name ?? 'N/A' }}</td>
                <td>{{ $ship->type ?? 'N/A' }}</td>
                <td>{{ $ship->cargo ?? 'N/A' }}</td>
                <td>{{ $ship->departure_time ? \Carbon\Carbon::parse($ship->departure_time)->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d M Y H:i') : 'N/A' }}</td>
                <td>{{ $ship->arrival_time ? \Carbon\Carbon::parse($ship->arrival_time)->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d M Y H:i') : 'N/A' }}</td>
                <td>{{ $ship->status ?? 'N/A' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="6" class="no-data">Tidak ada data aktivitas kapal tersedia untuk periode ini.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dibuat pada: {{ now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y H:i:s') }} WIB
    </div>
</body>
</html> 