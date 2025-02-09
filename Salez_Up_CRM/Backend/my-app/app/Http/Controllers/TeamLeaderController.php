<?php

namespace App\Http\Controllers;

use App\Models\TeamLeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamLeaderController extends Controller
{
    // POST: Create a new TeamLeader
    // public function store(Request $request)
    // {
    //     $data = $request->validate([
    //         'first_name' => 'required|string|max:255',
    //         'last_name' => 'required|string|max:255',
    //         'start_date' => 'required|date',
    //         'email' => 'required|email|unique:team_leaders,email',
    //         'password' => 'required|string',
    //         'manager_id' => 'required|exists:managers,id',
    //         'kpi_data' => 'nullable|json',
    //         'image_path' => 'required|string'
    //     ]);

    //     $teamLeader = TeamLeader::create($data);

    //     return response()->json($teamLeader, 201);
    // }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'email' => 'required|email|unique:team_leaders,email',
            'password' => 'required|string',
            'manager_id' => 'required|exists:manager_details,id',
            'kpi_data' => 'nullable|json',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif'
        ]);

        if ($request->hasFile('image_path')) {
            $image = $request->file('image_path');
            $folderPath = 'team_leader_images/' . $data['first_name'];
            $imagePath = $image->store($folderPath, 'public');
            $data['image_path'] = $imagePath;
        }

        $teamLeader = TeamLeader::create($data); 
        return response()->json($teamLeader, 201);
    }


    // GET: Retrieve all TeamLeaders (with Manager data)
    public function index()
    {
        $teamLeaders = TeamLeader::with('manager', 'kpi_data')->get();

        $teamLeaders->transform(function ($teamLeader) {
            if ($teamLeader->image_path) {
                $teamLeader->image_path = str_replace('/storage', '/public/storage', url(Storage::url($teamLeader->image_path)));
            }
            return $teamLeader;
        });
        return response()->json($teamLeaders, 200);
    }

    public function show($id)
    {
        $teamLeader = TeamLeader::with('manager', 'teamAndTeamLeaders')->findOrFail($id);
        if ($teamLeader->image_path) {
            $teamLeader->image_path = url(Storage::url($teamLeader->image_path));
        }   
        return response()->json($teamLeader, 200);
    }

    // PUT: Update a TeamLeader by ID
    // public function update(Request $request, $id)
    // {
    //     $teamLeader = TeamLeader::findOrFail($id);

    //     $data = $request->validate([
    //         'first_name' => 'sometimes|required|string|max:255',
    //         'last_name' => 'sometimes|required|string|max:255',
    //         'start_date' => 'sometimes|required|date',
    //         'email' => 'sometimes|required|email|unique:team_leaders,email,' . $id,
    //         'manager_id' => 'sometimes|required|exists:managers,id',
    //         'image_path' => 'sometimes|required|string'
    //     ]);

    //     $teamLeader->update($data);

    //     return response()->json($teamLeader, 200);
    // }

    public function update(Request $request, $id)
    {
        $teamLeader = TeamLeader::findOrFail($id);

        $data = $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'start_date' => 'sometimes|required|date',
            'email' => 'sometimes|required|email|unique:team_leaders,email,' . $id,
            'manager_id' => 'sometimes|required|exists:manager_details,id',
            'kpi_data' => 'sometimes|required|exists:manager_details,id',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif'
        ]);

        // Handle file upload if a new image is provided
        if ($request->hasFile('image_path')) {
            $newImage = $request->file('image_path');
            $folderPath = 'team_leader_images/' . $teamLeader->first_name;

            // Delete the old image if it exists
            if ($teamLeader->image_path && Storage::disk('public')->exists($teamLeader->image_path)) {
                Storage::disk('public')->delete($teamLeader->image_path);
            }

            // Store the new image
            $newImagePath = $newImage->store($folderPath, 'public');
            $data['image_path'] = $newImagePath;
        }

        // Update the rest of the team leader's data
        $teamLeader->update($data);

        return response()->json($teamLeader, 200);
    }


    public function updateKpiDataByIds(Request $request)
    {
        $data = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:team_leaders,id',
            'kpi_data' => 'required', 
        ]);

        $ids = $data['ids']; 
        $kpiData = $data['kpi_data'];

        $teamLeaders = TeamLeader::whereIn('id', $ids)->get();

        if ($teamLeaders->isEmpty()) {
            return response()->json(['message' => 'No team leaders found for the given ids'], 404);
        }
        
        foreach ($teamLeaders as $teamLeader) {
            $teamLeader->update(['kpi_data' => $kpiData]);
        }

        return response()->json(['message' => 'KPI data updated for all specified team leaders'], 200);
    }


    // DELETE: Delete a TeamLeader by ID
    public function destroy($id)
    {
        $teamLeader = TeamLeader::findOrFail($id);

        if ($teamLeader->image_path && Storage::disk('public')->exists($teamLeader->image_path)) {
            $folderPath = dirname($teamLeader->image_path);
            Storage::disk('public')->deleteDirectory($folderPath);
        }

        $teamLeader->delete();

        return response()->json(null, 204);
    }
}
