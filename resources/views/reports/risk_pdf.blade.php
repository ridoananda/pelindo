<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $reportType ?? 'Laporan Analisis Risiko' }}</title>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; margin: 20px; font-size: 12px; }
        h1 { text-align: center; margin-bottom: 5px; font-size: 1.5em; }
        h2 { font-size: 1.2em; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;}
        h3 { text-align: center; margin-top: 0px; margin-bottom: 15px; font-weight: normal; font-size: 1.1em; }
        .meta-info { margin-bottom: 20px; font-size: 0.9em; border-bottom: 1px solid #eee; padding-bottom: 10px;}
        .meta-info p { margin: 3px 0; }
        .stats-grid { display: table; width: 100%; margin-bottom: 20px; }
        .stats-row { display: table-row; }
        .stats-cell { display: table-cell; width: 20%; text-align: center; padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; }
        .stats-label { font-size: 0.8em; color: #666; margin-bottom: 5px; }
        .stats-value { font-size: 1.2em; font-weight: bold; }
        .stats-tinggi { color: #ea580c; }
        .stats-normal { color: #16a34a; }
        .stats-total { color: #374151; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.85em;}
        th, td { border: 1px solid #333333; padding: 6px 8px; text-align: left; word-wrap: break-word; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .footer { margin-top: 30px; text-align: right; font-size:0.8em; color: #666666; }
        .no-data { text-align: center; padding: 20px; font-style: italic; color: #666666; }
    </style>
</head>
<body>
    <h1>{{ $reportType ?? 'Laporan Analisis Risiko' }}</h1>
    <h3>Periode: {{ $reportPeriod ?? 'N/A' }}</h3>

    <div class="meta-info">
        <p><strong>Tanggal Laporan:</strong> {{ $reportDate ?? now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y') }}</p>
    </div>

    @if(isset($riskStats))
    <h2>Statistik Risiko</h2>
    <div class="stats-grid">
        <div class="stats-row">
            <div class="stats-cell">
                <div class="stats-label">Total Risiko</div>
                <div class="stats-value stats-total">{{ $riskStats['total'] ?? 0 }}</div>
            </div>
            <div class="stats-cell">
                <div class="stats-label">Tinggi</div>
                <div class="stats-value stats-tinggi">{{ $riskStats['tinggi'] ?? 0 }}</div>
            </div>
            <div class="stats-cell">
                <div class="stats-label">Normal</div>
                <div class="stats-value stats-normal">{{ $riskStats['normal'] ?? 0 }}</div>
            </div>
            <div class="stats-cell">
                <div class="stats-label">Rendah</div>
                <div class="stats-value stats-rendah">{{ $riskStats['rendah'] ?? 0 }}</div>
            </div>
        </div>
    </div>
    @endif

    <h2>Daftar Risiko</h2>
    <table>
        <thead>
            <tr>
                <th>Jenis Risiko</th>
                <th>Dampak</th>
                <th>Tingkat Risiko</th>
                <th>Rekomendasi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($risks as $risk)
            <tr>
                <td>{{ $risk->type ?? 'N/A' }}</td>
                <td>{{ $risk->impact ?? 'N/A' }}</td>
                <td>{{ $risk->status ?? 'N/A' }}</td>
                <td>{{ $risk->recommendation ?? 'N/A' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="4" class="no-data">Tidak ada data risiko tersedia untuk periode ini.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <h2>Laporan Insiden Risiko</h2>
    <table>
        <thead>
            <tr>
                <th>Tanggal Laporan Insiden</th>
                <th>Jenis Risiko</th>
                <th>Deskripsi</th>
                <th>Tindakan yang Direkomendasikan</th>
            </tr>
        </thead>
        <tbody>
            @forelse($riskReports as $report)
            <tr>
                <td>{{ $report->report_date ? \Carbon\Carbon::parse($report->report_date)->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d M Y') : ($report->created_at ? $report->created_at->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d M Y') : 'N/A') }}</td>
                <td>{{ $report->type ?? ($report->risk_type ?? 'N/A') }}</td>
                <td>{{ $report->description ?? 'N/A' }}</td>
                <td>{{ $report->recommended_action ?? ($report->recommendation ?? 'N/A') }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="4" class="no-data">Tidak ada laporan insiden risiko tersedia untuk periode ini.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dibuat pada: {{ now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y H:i:s') }} WIB
    </div>
</body>
</html>
