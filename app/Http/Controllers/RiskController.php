<?php

namespace App\Http\Controllers;

use App\Models\Risk;
use App\Models\RiskReport;
use App\Models\RiskAssessment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RiskController extends Controller
{
    public function index()
    {
        $risks = Risk::latest()->get();
        $riskStatus = $this->calculateOverallRiskStatus($risks);
        $riskReports = RiskReport::latest()->get();

        // FMEA Data
        $riskAssessments = RiskAssessment::orderBy('risk_code')->get();
        $fmeaAnalysisSummary = RiskAssessment::getAnalysisSummary();

        // Calculate risk statistics
        $riskStats = $this->calculateRiskStatistics($risks);

        return Inertia::render('Risks/Index', [
            'risks' => $risks,
            'riskStatus' => $riskStatus,
            'riskReports' => $riskReports,
            'riskStats' => $riskStats,
            'riskAssessments' => $riskAssessments,
            'fmeaAnalysisSummary' => $fmeaAnalysisSummary,
        ]);
    }

    private function calculateOverallRiskStatus($risks)
    {
        if ($risks->isEmpty()) {
            return 'Rendah';
        }

        // Count risks by status
        $riskCounts = [
            'Ekstrim' => $risks->where('status', 'Ekstrim')->count(),
            'Tinggi' => $risks->where('status', 'Tinggi')->count(),
            'Menengah' => $risks->where('status', 'Menengah')->count(),
            'Rendah' => $risks->where('status', 'Rendah')->count(),
        ];

        // Determine overall risk status based on highest risk level present
        if ($riskCounts['Ekstrim'] > 0) {
            return 'Ekstrim';
        } elseif ($riskCounts['Tinggi'] > 0) {
            return 'Tinggi';
        } elseif ($riskCounts['Menengah'] > 0) {
            return 'Menengah';
        } else {
            return 'Rendah';
        }
    }

    private function calculateRiskStatistics($risks)
    {
        return [
            'total' => $risks->count(),
            'ekstrim' => $risks->where('status', 'Ekstrim')->count(),
            'tinggi' => $risks->where('status', 'Tinggi')->count(),
            'menengah' => $risks->where('status', 'Menengah')->count(),
            'rendah' => $risks->where('status', 'Rendah')->count(),
        ];
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'impact' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'recommendation' => 'required|string',
        ]);

        Risk::create($validated);

        return redirect()->route('risks.index');
    }

    public function storeReport(Request $request)
    {
        $validated = $request->validate([
            'report_date' => 'required|date',
            'risk_type' => 'required|string|max:255',
            'description' => 'required|string',
            'recommended_action' => 'required|string',
        ]);

        RiskReport::create($validated);

        return redirect()->route('risks.index');
    }

    public function update(Request $request, Risk $risk)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'impact' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'recommendation' => 'required|string',
        ]);

        $risk->update($validated);

        return redirect()->route('risks.index');
    }

    public function destroy(Risk $risk)
    {
        $risk->delete();

        return redirect()->route('risks.index');
    }

    // FMEA Assessment Methods
    public function storeAssessment(Request $request)
    {
        $validated = $request->validate([
            'respondent_name' => 'required|string|max:255',
            'respondent_job' => 'required|in:Manajer Bistek Operasional,Petugas Lapangan Operasional',
            'risk_code' => 'required|string|max:10',
            'risk_description' => 'required|string',
            'severity' => 'required|integer|min:1|max:10',
            'occurrence' => 'required|integer|min:1|max:10',
            'detection' => 'required|integer|min:1|max:10',
        ]);

        RiskAssessment::create($validated);

        return redirect()->route('risks.index')->with('success', 'Assessment berhasil ditambahkan.');
    }

    public function updateAssessment(Request $request, RiskAssessment $riskAssessment)
    {
        $validated = $request->validate([
            'respondent_name' => 'required|string|max:255',
            'respondent_job' => 'required|in:Manajer Bistek Operasional,Petugas Lapangan Operasional',
            'risk_code' => 'required|string|max:10',
            'risk_description' => 'required|string',
            'severity' => 'required|integer|min:1|max:10',
            'occurrence' => 'required|integer|min:1|max:10',
            'detection' => 'required|integer|min:1|max:10',
        ]);

        $riskAssessment->update($validated);

        return redirect()->route('risks.index')->with('success', 'Assessment berhasil diperbarui.');
    }

    public function destroyAssessment(RiskAssessment $riskAssessment)
    {
        $riskAssessment->delete();
        return redirect()->route('risks.index')->with('success', 'Assessment berhasil dihapus.');
    }
}
