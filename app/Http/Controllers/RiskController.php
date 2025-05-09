<?php

namespace App\Http\Controllers;

use App\Models\Risk;
use App\Models\RiskReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RiskController extends Controller
{
    public function index()
    {
        $risks = Risk::latest()->get();
        $riskStatus = Risk::orderBy('created_at', 'desc')->first()?->status ?? 'Risiko Rendah';
        $riskReports = RiskReport::latest()->get();

        return Inertia::render('Risks/Index', [
            'risks' => $risks,
            'riskStatus' => $riskStatus,
            'riskReports' => $riskReports,
        ]);
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
}
