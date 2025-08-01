<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ShipController;
use App\Http\Controllers\LogisticController;
use App\Http\Controllers\CargoActivityController;
use App\Http\Controllers\RiskController;

use App\Http\Controllers\ProductionController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Routes accessible by both operator and manager
Route::middleware(['auth', 'role:operator,manager'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Risk management - accessible by both roles
    Route::get('/risks', [RiskController::class, 'index'])->name('risks.index');
    Route::post('/risks', [RiskController::class, 'store'])->name('risks.store');
    Route::post('/risk-reports', [RiskController::class, 'storeReport'])->name('risk-reports.store');
    Route::put('/risks/{risk}', [RiskController::class, 'update'])->name('risks.update');
    Route::delete('/risks/{risk}', [RiskController::class, 'destroy'])->name('risks.destroy');

    // FMEA Risk Assessment - accessible by both roles (integrated with risk management)
    Route::post('/risk-assessments', [RiskController::class, 'storeAssessment'])->name('risk-assessments.store');
    Route::put('/risk-assessments/{riskAssessment}', [RiskController::class, 'updateAssessment'])->name('risk-assessments.update');
    Route::delete('/risk-assessments/{riskAssessment}', [RiskController::class, 'destroyAssessment'])->name('risk-assessments.destroy');

    // Reports - accessible by both roles
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/logistic', [ReportController::class, 'generateLogisticReport'])->name('reports.logistic');
    Route::get('/reports/ships', [ReportController::class, 'generateShipReport'])->name('reports.ships');
    Route::get('/reports/risks', [ReportController::class, 'generateRiskReport'])->name('reports.risks');
    Route::get('/reports/cargo-activities', [ReportController::class, 'generateCargoActivityReport'])->name('reports.cargo-activities');
});

// Routes accessible only by operators
Route::middleware(['auth', 'role:operator'])->group(function () {
    // Ships management - operator only
    Route::get('/ships', [ShipController::class, 'index'])->name('ships.index');
    Route::post('/ships', [ShipController::class, 'store'])->name('ships.store');
    Route::put('/ships/{ship}', [ShipController::class, 'update'])->name('ships.update');
    Route::delete('/ships/{ship}', [ShipController::class, 'destroy'])->name('ships.destroy');

    // Logistics management - operator only
    Route::get('/logistics', [LogisticController::class, 'index'])->name('logistics.index');
    Route::post('/logistics', [LogisticController::class, 'store'])->name('logistics.store');
    Route::put('/logistics/{logistic}', [LogisticController::class, 'update'])->name('logistics.update');
    Route::delete('/logistics/{logistic}', [LogisticController::class, 'destroy'])->name('logistics.destroy');

    // Cargo activities - operator only
    Route::get('/cargo-activities', [CargoActivityController::class, 'index'])->name('cargo-activities.index');
    Route::post('/cargo-activities', [CargoActivityController::class, 'store'])->name('cargo-activities.store');
    Route::put('/cargo-activities/{cargoActivity}', [CargoActivityController::class, 'update'])->name('cargo-activities.update');
    Route::delete('/cargo-activities/{cargoActivity}', [CargoActivityController::class, 'destroy'])->name('cargo-activities.destroy');

    // Production - operator only
    Route::get('/productions', [ProductionController::class, 'index'])->name('productions.index');
    Route::post('/productions', [ProductionController::class, 'store'])->name('productions.store');
    Route::put('/productions/{production}', [ProductionController::class, 'update'])->name('productions.update');
    Route::delete('/productions/{production}', [ProductionController::class, 'destroy'])->name('productions.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
