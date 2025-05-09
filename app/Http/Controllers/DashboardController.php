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
        $riskStatus = Risk::orderBy('created_at', 'desc')->first()?->status ?? 'Risiko Rendah';

        return Inertia::render('Dashboard', [
            'shipCount' => $shipCount,
            'logisticCount' => $logisticCount,
            'cargoActivityCount' => $cargoActivityCount,
            'riskStatus' => $riskStatus,
        ]);
    }
}
