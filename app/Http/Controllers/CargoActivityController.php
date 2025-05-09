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

        if ($request->has('search')) {
            $query->where('ship_name', 'like', '%' . $request->search . '%');
        }

        $cargoActivities = $query->latest()->get();

        return Inertia::render('CargoActivities/Index', [
            'cargoActivities' => $cargoActivities,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ship_name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'quantity' => 'required|string|max:255',
            'operator' => 'required|string|max:255',
            'time' => 'required',
            'status' => 'required|in:Selesai,Dalam proses,Tertunda atau bermasalah',
        ]);

        CargoActivity::create($validated);

        return redirect()->route('cargo-activities.index');
    }

    public function update(Request $request, CargoActivity $cargoActivity)
    {
        $validated = $request->validate([
            'ship_name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'quantity' => 'required|string|max:255',
            'operator' => 'required|string|max:255',
            'time' => 'required',
            'status' => 'required|in:Selesai,Dalam proses,Tertunda atau bermasalah',
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
