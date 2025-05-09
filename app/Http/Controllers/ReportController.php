<?php

namespace App\Http\Controllers;

use App\Models\Logistic;
use App\Models\Ship;
use App\Models\Risk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    public function generateLogisticReport(Request $request)
    {
        $query = Logistic::query();

        if ($request->filled('month')) {
            $query->whereMonth('date', $request->month);
        }

        if ($request->filled('year')) {
            $query->whereYear('date', $request->year);
        }

        $logistics = $query->latest()->get();

        return Inertia::render('Reports/Logistic', [
            'logistics' => $logistics,
            'reportType' => 'Laporan Logistik',
            'reportDate' => now()->format('d F Y'),
            'reportPeriod' => $request->month ? date('F Y', mktime(0, 0, 0, $request->month, 1, $request->year ?? now()->year)) : ($request->year ?? now()->year),
            'managerName' => 'ABCDEFGHIJK',
        ]);
    }

    public function generateShipReport(Request $request)
    {
        $ships = Ship::latest()->get();

        return Inertia::render('Reports/Ship', [
            'ships' => $ships,
            'reportType' => 'Laporan Aktivitas Kapal',
            'reportDate' => now()->format('d F Y'),
            'reportPeriod' => $request->month ? date('F Y', mktime(0, 0, 0, $request->month, 1, $request->year ?? now()->year)) : ($request->year ?? now()->year),
            'managerName' => 'ABCDEFGHIJK',
        ]);
    }

    public function generateRiskReport(Request $request)
    {
        $risks = Risk::latest()->get();

        return Inertia::render('Reports/Risk', [
            'risks' => $risks,
            'reportType' => 'Laporan Analisis Risiko',
            'reportDate' => now()->format('d F Y'),
            'reportPeriod' => $request->month ? date('F Y', mktime(0, 0, 0, $request->month, 1, $request->year ?? now()->year)) : ($request->year ?? now()->year),
            'managerName' => 'ABCDEFGHIJK',
        ]);
    }
}
