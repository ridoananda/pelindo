<?php

namespace App\Http\Controllers;

use App\Models\CargoActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CargoActivityController extends Controller
{
    public function index(Request $request)
    {
        $query = CargoActivity::query();

        // Enhanced search functionality
        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('ship_name', 'like', '%' . $searchTerm . '%')
                  ->orWhere('type', 'like', '%' . $searchTerm . '%')
                  ->orWhere('cargo_type', 'like', '%' . $searchTerm . '%')
                  ->orWhere('operator', 'like', '%' . $searchTerm . '%');
            });
        }

        // Status filter
        if ($request->has('status') && $request->status && $request->status !== 'Semua') {
            $query->where('status', $request->status);
        }

        $cargoActivities = $query->latest()->get();

        return Inertia::render('CargoActivities/Index', [
            'cargoActivities' => $cargoActivities,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ship_name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'cargo_type' => 'required|string|max:255',
            'quantity' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
            'operator' => 'required|string|max:255',
            'time' => 'required',
            'status' => 'required|in:Dalam Proses,Selesai,Tertunda,Dibatalkan',
            'notes' => 'nullable|string',
        ]);

        CargoActivity::create($validated);

        return redirect()->route('cargo-activities.index');
    }

    public function update(Request $request, CargoActivity $cargoActivity)
    {
        $validated = $request->validate([
            'ship_name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'cargo_type' => 'required|string|max:255',
            'quantity' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
            'operator' => 'required|string|max:255',
            'time' => 'required',
            'status' => 'required|in:Dalam Proses,Selesai,Tertunda,Dibatalkan',
            'notes' => 'nullable|string',
        ]);

        $cargoActivity->update($validated);

        return redirect()->route('cargo-activities.index');
    }

    public function destroy(CargoActivity $cargoActivity)
    {
        $cargoActivity->delete();

        return redirect()->route('cargo-activities.index');
    }
}
