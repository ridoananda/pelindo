<?php

namespace App\Http\Controllers;

use App\Models\Logistic;
use App\Models\Ship;
use App\Models\Risk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\LogisticReportExport;
use App\Exports\ShipReportExport;
use App\Exports\RiskReportExport;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    private function getReportPeriod(Request $request)
    {
        if ($request->filled('start_date') && $request->filled('end_date')) {
            return Carbon::parse($request->start_date)->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d M Y') . ' - ' . Carbon::parse($request->end_date)->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d M Y');
        } elseif ($request->filled('month') && $request->filled('year')) {
            return Carbon::createFromDate($request->year, $request->month, 1)->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('F Y');
        } elseif ($request->filled('year')) {
            return $request->year;
        }
        return 'Data Terkini';
    }

    public function generateLogisticReport(Request $request)
    {
        $request->validate([
            'month' => 'nullable|integer|between:1,12',
            'year' => 'nullable|integer|digits:4',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'format' => 'nullable|string|in:pdf,excel'
        ]);

        $query = Logistic::query();

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        } elseif ($request->filled('year')) {
            $query->whereYear('date', $request->year);
            if ($request->filled('month')) {
                $query->whereMonth('date', $request->month);
            }
        }

        $logistics = $query->latest()->get();
        $reportType = 'Laporan Logistik';
        $reportDate = now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y');
        $reportPeriod = $this->getReportPeriod($request);

        $data = [
            'logistics' => $logistics,
            'reportType' => $reportType,
            'reportDate' => $reportDate,
            'reportPeriod' => $reportPeriod,
        ];

        if ($request->filled('format')) {
            $format = $request->format;
            $actualFormat = $format === 'excel' ? 'xlsx' : $format;
            $fileName = 'logistic-report-' . time() . '.' . $actualFormat;
            $directory = 'reports/logistics';
            $filePath = $directory . '/' . $fileName;

            if (!Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->makeDirectory($directory);
            }

            if ($format === 'pdf') {
                $pdf = Pdf::loadView('reports.logistic_pdf', $data);
                Storage::disk('public')->put($filePath, $pdf->output());
            } elseif ($format === 'excel') {
                Excel::store(new LogisticReportExport($logistics), $filePath, 'public');
            }
            
            return redirect()->back()->with('flash', [
                'report_url' => asset('storage/' . $filePath),
                'message' => 'Laporan ' . ucfirst($format) . ' berhasil dibuat.',
                'file_name' => $fileName
            ]);
        }

        return Inertia::render('Reports/Logistic', $data);
    }

    public function generateShipReport(Request $request)
    {
        $request->validate([
            'month' => 'nullable|integer|between:1,12',
            'year' => 'nullable|integer|digits:4',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'format' => 'nullable|string|in:pdf,excel'
        ]);

        $query = Ship::query();

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        } elseif ($request->filled('year')) {
            $query->whereYear('created_at', $request->year);
            if ($request->filled('month')) {
                $query->whereMonth('created_at', $request->month);
            }
        }

        $ships = $query->latest()->get();
        $reportType = 'Laporan Aktivitas Kapal';
        $reportDate = now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y');
        $reportPeriod = $this->getReportPeriod($request);

        $data = [
            'ships' => $ships,
            'reportType' => $reportType,
            'reportDate' => $reportDate,
            'reportPeriod' => $reportPeriod,
        ];

        if ($request->filled('format')) {
            $format = $request->format;
            $actualFormat = $format === 'excel' ? 'xlsx' : $format;
            $fileName = 'ship-activity-report-' . time() . '.' . $actualFormat;
            $directory = 'reports/ships';
            $filePath = $directory . '/' . $fileName;
            
            if (!Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->makeDirectory($directory);
            }

            if ($format === 'pdf') {
                $pdf = Pdf::loadView('reports.ship_pdf', $data);
                Storage::disk('public')->put($filePath, $pdf->output());
            } elseif ($format === 'excel') {
                Excel::store(new ShipReportExport($ships), $filePath, 'public');
            }
            
            return redirect()->back()->with('flash', [
                'report_url' => asset('storage/' . $filePath),
                'message' => 'Laporan ' . ucfirst($format) . ' berhasil dibuat.',
                'file_name' => $fileName
            ]);
        }

        return Inertia::render('Reports/Ship', $data);
    }

    public function generateRiskReport(Request $request)
    {
        $request->validate([
            'month' => 'nullable|integer|between:1,12',
            'year' => 'nullable|integer|digits:4',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'format' => 'nullable|string|in:pdf,excel'
        ]);

        $query = Risk::query();

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        } elseif ($request->filled('year')) {
            $query->whereYear('created_at', $request->year);
            if ($request->filled('month')) {
                $query->whereMonth('created_at', $request->month);
            }
        }

        $risks = $query->latest()->get();
        $reportType = 'Laporan Analisis Risiko';
        $reportDate = now()->setTimezone('Asia/Jakarta')->locale('id')->translatedFormat('d F Y');
        $reportPeriod = $this->getReportPeriod($request);

        $data = [
            'risks' => $risks,
            'riskReports' => $risks,
            'reportType' => $reportType,
            'reportDate' => $reportDate,
            'reportPeriod' => $reportPeriod,
        ];

        if ($request->filled('format')) {
            $format = $request->format;
            $actualFormat = $format === 'excel' ? 'xlsx' : $format;
            $fileName = 'risk-analysis-report-' . time() . '.' . $actualFormat;
            $directory = 'reports/risks';
            $filePath = $directory . '/' . $fileName;

            if (!Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->makeDirectory($directory);
            }

            if ($format === 'pdf') {
                $pdf = Pdf::loadView('reports.risk_pdf', $data);
                Storage::disk('public')->put($filePath, $pdf->output());
            } elseif ($format === 'excel') {
                Excel::store(new RiskReportExport($risks), $filePath, 'public');
            }
            
            return redirect()->back()->with('flash', [
                'report_url' => asset('storage/' . $filePath),
                'message' => 'Laporan ' . ucfirst($format) . ' berhasil dibuat.',
                'file_name' => $fileName
            ]);
        }
        
        return Inertia::render('Reports/Risk', $data);
    }
}
