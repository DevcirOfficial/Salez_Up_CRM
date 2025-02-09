<?php

namespace App\Http\Controllers;

use App\Models\LeaderKpi;
use Illuminate\Http\Request;

class LeaderKpiController extends Controller
{
    // Get all KPI records
    public function index()
    {
        return LeaderKpi::all();
    }

    // Store a new KPI record
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'team_id' => 'required|integer',
            'team_leader_id' => 'required|integer',
            'kpi_data' => 'required|json',
        ]);

        // Use updateOrCreate to either update an existing record or create a new one
        $leaderKpi = LeaderKpi::updateOrCreate(
            [
                'team_id' => $validatedData['team_id'],
                'team_leader_id' => $validatedData['team_leader_id'],
            ],
            [
                'kpi_data' => $validatedData['kpi_data'],
            ]
        );

        return response()->json($leaderKpi, 201);
    }
    // Show a single KPI record
    public function show($id)
    {
        return LeaderKpi::findOrFail($id);
    }

    // Update an existing KPI record
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'kpi_data' => 'required|array',
        ]);

        $leaderKpi = LeaderKpi::findOrFail($id);
        $leaderKpi->update($validatedData);

        return response()->json($leaderKpi, 200);
    }


    public function updateWithTeamId(Request $request, $team_leader_id)
    {
        $validatedData = $request->validate([
            'kpi_data' => 'required|json',
        ]);

        $leaderKpi = LeaderKpi::where('team_leader_id', $team_leader_id)->firstOrFail();

        $leaderKpi->update($validatedData);

        return response()->json($leaderKpi, 200);
    }

    // Delete a KPI record
    public function destroy($id)
    {
        LeaderKpi::destroy($id);

        return response()->json(null, 204);
    }
}