<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $reportType ?? 'Laporan Logistik' }}</title>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; margin: 20px; font-size: 12px; }
        h1 { text-align: center; margin-bottom: 5px; font-size: 1.5em; }
        h3 { text-align: center; margin-top: 0px; margin-bottom: 15px; font-weight: normal; font-size: 1.1em; }
        .meta-info { margin-bottom: 20px; font-size: 0.9em; border-bottom: 1px solid #eee; padding-bottom: 10px;}
        .meta-info p { margin: 3px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.9em;}
        th, td { border: 1px solid #custom_dark_gray; padding: 6px 8px; text-align: left; word-wrap: break-word; }
        th { background-color: #custom_light_gray; font-weight: bold; }
        .footer { margin-top: 30px; text-align: right; font-size:0.8em; color: #custom_medium_gray; }
        .text-center { text-align: center; }
        .no-data { text-align: center; padding: 20px; font-style: italic; color: #custom_medium_gray; }

        /* Define custom colors if needed, or use standard hex codes */
        :root {
            --custom-dark-gray: #333333;
            --custom-medium-gray: #666666;
            --custom-light-gray: #f2f2f2;
        }
    </style>
</head>
<body>
    <h1>{{ $reportType ?? 'Laporan Logistik' }}</h1>
    <h3>Periode: {{ $reportPeriod ?? 'N/A' }}</h3>

    <div class="meta-info">
        <p><strong>Tanggal Laporan:</strong> {{ $reportDate ?? now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Nama Item</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($logistics as $item)
            <tr>
                <td>{{ $item->name ?? 'N/A' }}</td>
                <td>{{ $item->category ?? 'N/A' }}</td>
                <td>{{ $item->date ? \Carbon\Carbon::parse($item->date)->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d M Y') : 'N/A' }}</td>
                <td>{{ $item->status ?? 'N/A' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="4" class="no-data">Tidak ada data tersedia untuk periode ini.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dibuat pada: {{ now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y H:i:s') }} WIB
    </div>
</body>
</html>
