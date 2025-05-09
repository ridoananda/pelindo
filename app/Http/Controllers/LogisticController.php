<?php

namespace App\Http\Controllers;

use App\Models\Logistic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogisticController extends Controller
{
    public function index(Request $request)
    {
        $query = Logistic::query();

        if ($request->filled('month')) {
            $query->whereMonth('date', $request->month);
        }

        if ($request->filled('year')) {
            $query->whereYear('date', $request->year);
        }

        if ($request->filled('day')) {
            $query->whereDay('date', $request->day);
        }

        $logistics = $query->latest()->get();

        return Inertia::render('Logistics/Index', [
            'logistics' => $logistics,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|in:Masuk,Keluar',
        ]);

        Logistic::create($validated);

        return redirect()->route('logistics.index');
    }

    public function update(Request $request, Logistic $logistic)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|in:Masuk,Keluar',
        ]);

        $logistic->update($validated);

        return redirect()->route('logistics.index');
    }

    public function destroy(Logistic $logistic)
    {
        $logistic->delete();

        return redirect()->route('logistics.index');
    }
}
