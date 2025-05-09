<?php

namespace App\Http\Controllers;

use App\Models\Production;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductionController extends Controller
{
    public function index()
    {
        $productions = Production::latest()->get();

        return Inertia::render('Productions/Index', [
            'productions' => $productions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'production_date' => 'required|date',
            'production_type' => 'required|string|max:255',
            'grain_type' => 'required|string|max:255',
            'grain_weight' => 'required|integer',
        ]);

        Production::create($validated);

        return redirect()->route('productions.index');
    }

    public function update(Request $request, Production $production)
    {
        $validated = $request->validate([
            'production_date' => 'required|date',
            'production_type' => 'required|string|max:255',
            'grain_type' => 'required|string|max:255',
            'grain_weight' => 'required|integer',
        ]);

        $production->update($validated);

        return redirect()->route('productions.index');
    }

    public function destroy(Production $production)
    {
        $production->delete();

        return redirect()->route('productions.index');
    }
}
