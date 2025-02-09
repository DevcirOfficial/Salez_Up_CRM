<?php

namespace App\Http\Controllers;

use App\Models\SalesAgent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SalesAgentController extends Controller
{
    // POST: Create a new SalesAgent
    public function store(Request $request)
    {
        $data = $request->validate([
            'team_id' => 'sometimes|exists:teams,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'email' => 'required|email|max:255',
            'password' => 'required|string',
            'manager_id' => 'required|exists:manager_details,id',
            'kpi_data' => 'sometimes|json',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image_path')) {
            $image = $request->file('image_path');
            $folderPath = 'sales_agents/' . $data['first_name'];
            $imagePath = $image->store($folderPath, 'public');
            $data['image_path'] = $imagePath;
        }

        $salesAgent = SalesAgent::create($data);
        return response()->json($salesAgent, 201);
    }

    public function index()
    {
        $salesAgents = SalesAgent::with(['team', 'manager'])->get();

        $salesAgents->transform(function ($salesAgent) {
            if ($salesAgent->image_path) {
                $salesAgent->image_path = url(Storage::url($salesAgent->image_path));
            }
            return $salesAgent;
        });

        return response()->json($salesAgents, 200);
    }


    // GET: Retrieve a SalesAgent by ID (with Team and Manager data)
    public function show($id)
    {
        $salesAgent = SalesAgent::with(['team', 'manager'])->findOrFail($id);
    
        if ($salesAgent->image_path) {
            $salesAgent->image_path = url(Storage::url($salesAgent->image_path));
        }
    
        return response()->json($salesAgent, 200);
    }



    // get by team_id

    public function getByTeamId($team_id)
{
    $salesAgents = SalesAgent::with(['team', 'manager'])
        ->where('team_id', $team_id)
        ->get(); // Fetch all agents for the given team ID

    foreach ($salesAgents as $salesAgent) {
        if ($salesAgent->image_path) {
            $salesAgent->image_path = url(Storage::url($salesAgent->image_path));
        }
    }

    return response()->json($salesAgents, 200);
}



    // PUT: Update a SalesAgent by ID
    public function update(Request $request, $id)
    {
        $salesAgent = SalesAgent::findOrFail($id);

        $data = $request->validate([
            'team_id' => 'sometimes|required|exists:teams,id',
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'start_date' => 'sometimes|required|date',
            'email' => 'sometimes|required|email|max:255',
            'manager_id' => 'sometimes|required|exists:managers,id',
            'kpi_data' => 'nullable|json',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($request->hasFile('image_path')) {
            $newImage = $request->file('image_path');
            $folderPath = 'sales_agents/' . $salesAgent['first_name'] . $salesAgent['last_name'];

            // Delete the old image if it exists
            if ($salesAgent->image_path && Storage::disk('public')->exists($salesAgent->image_path)) {
                Storage::disk('public')->delete($salesAgent->image_path);
            }

            // Store the new image
            $newImagePath = $newImage->store($folderPath, 'public');
            $data['image_path'] = $newImagePath;
        }

        // Update SalesAgent with the validated data
        $salesAgent->update($data);

        return response()->json($salesAgent, 200);
    }

    public function updateKpiDataTeams(Request $request)
    {
        $data = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:teams,id',
            'kpi_data' => 'required', 
        ]);

        $ids = $data['ids']; 
        $kpiData = $data['kpi_data'];

        $salesAgents = SalesAgent::whereIn('team_id', $ids)->get();

        if ($salesAgents->isEmpty()) {
            return response()->json(['message' => 'No Sales Agent found for the given ids'], 200);
        }
        
        foreach ($salesAgents as $salesAgent) {
            $salesAgent->update(['kpi_data' => $kpiData]);
        }

        return response()->json(['message' => 'KPI data updated for all specified Sales Agent'], 200);
    }

    // DELETE: Delete a SalesAgent by ID
    public function destroy($id)
    {
        $salesAgent = SalesAgent::findOrFail($id);

        if (!$salesAgent) {
            return response()->json(['message' => 'Sales Agent not found'], 404);
        }

        if ($salesAgent->image_path && Storage::disk('public')->exists($salesAgent->image_path)) {
            $folderPath = dirname($salesAgent->image_path);  
            Storage::disk('public')->deleteDirectory($folderPath); 
        }

        $salesAgent->delete();
        
        return response()->json(null, 204);
    }
}
