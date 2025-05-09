<?php

namespace App\Http\Controllers;

use App\Models\Ship;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShipController extends Controller
{
    public function index()
    {
        $ships = Ship::latest()->get();

        return Inertia::render('Ships/Index', [
            'ships' => $ships,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'departure_time' => 'required',
            'arrival_time' => 'required',
            'status' => 'required|string|max:255',
        ]);

        Ship::create($validated);

        return redirect()->route('ships.index');
    }

    public function update(Request $request, Ship $ship)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'departure_time' => 'required',
            'arrival_time' => 'required',
            'status' => 'required|string|max:255',
        ]);

        $ship->update($validated);

        return redirect()->route('ships.index');
    }

    public function destroy(Ship $ship)
    {
        $ship->delete();

        return redirect()->route('ships.index');
    }
}
