<?php

namespace App\Http\Controllers;

use App\Models\Ship;
use App\Models\Logistic;
use App\Models\CargoActivity;
use App\Models\Risk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $shipCount = Ship::count();
        $logisticCount = Logistic::count();
        $cargoActivityCount = CargoActivity::count();

        // Calculate proper risk status based on current risk levels
        $riskStatus = $this->calculateOverallRiskStatus();

        return Inertia::render('Dashboard', [
            'shipCount' => $shipCount,
            'logisticCount' => $logisticCount,
            'cargoActivityCount' => $cargoActivityCount,
            'riskStatus' => $riskStatus,
        ]);
    }

    private function calculateOverallRiskStatus()
    {
        $risks = Risk::all();

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
}
