<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignsAndTeams;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

class CampaignsAndTeamsController extends Controller
{

    public function index()
    {
        $campaignsAndTeams = CampaignsAndTeams::with(['team', 'campaign', 'departmentHead', 'juniorDepartmentHead'])->get();
    
        $campaignsAndTeams->each(function ($item) {
            if ($item->campaign && $item->campaign->image_path) {
                $item->campaign->image_path = str_replace('/storage', '/public/storage', url(Storage::url($item->campaign->image_path)));
            } else {
                $item->campaign->image_path = null;
            }
        });
    
        return $campaignsAndTeams;
    }

    // Get a single record by ID
    public function show($id)
    {
        // Include department head and junior department head in the relation
        return CampaignsAndTeams::with(['team', 'campaign', 'departmentHead', 'juniorDepartmentHead'])->findOrFail($id);
    }

    // Create a new record
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'campaign_id' => 'required|exists:campaigns,id',
            'department_head_id' => 'nullable|exists:department_heads,id', // Validate department head ID
            'junior_department_head_id' => 'nullable|exists:junior_department_heads,id', // Validate junior department head ID
        ]);

        // Create a new record
        $campaignsAndTeams = CampaignsAndTeams::create($validatedData);

        return response()->json($campaignsAndTeams, 201);
    }


    public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'team_id' => 'sometimes|exists:teams,id',
        'campaign_id' => 'sometimes|exists:campaigns,id',
        'department_head_id' => 'nullable|sometimes|exists:department_heads,id', // Validate department head ID
        'junior_department_head_id' => 'sometimes|exists:junior_department_heads,id', // Validate junior department head ID
    ]);

    // Check if `department_head_id` is being updated
    if (isset($validatedData['department_head_id'])) {
        // Find any records where the department_head_id is the same as the one being updated
        CampaignsAndTeams::where('department_head_id', $validatedData['department_head_id'])
            ->where('id', '!=', $id) // Exclude the current record
            ->update(['department_head_id' => null]); // Set previous matching department_head_id to null
    }

    // Check if `junior_department_head_id` is being updated
    if (isset($validatedData['junior_department_head_id'])) {
        // Find any records where the junior_department_head_id is the same as the one being updated
        CampaignsAndTeams::where('junior_department_head_id', $validatedData['junior_department_head_id'])
            ->where('id', '!=', $id) // Exclude the current record
            ->update(['junior_department_head_id' => null]); // Set previous matching junior_department_head_id to null
    }

    // Find the current record and update it
    $campaignsAndTeams = CampaignsAndTeams::findOrFail($id);
    $campaignsAndTeams->update($validatedData);

    return response()->json($campaignsAndTeams, 200);
}


    // Delete a record by ID
    public function destroy($id)
    {
        // Find the record by ID
        $campaignsAndTeams = CampaignsAndTeams::findOrFail($id);
        // Delete the record
        $campaignsAndTeams->delete();

        return response()->json(['message' => 'Record deleted successfully'], 200);
    }


    public function removeDeptHeadId($department_head_id)
    {
        // Find and update all records where department_head_id matches the given id
        $affectedRows = CampaignsAndTeams::where('department_head_id', $department_head_id)
            ->update(['department_head_id' => null]);
    
        if ($affectedRows > 0) {
            return response()->json([
                'message' => 'department_head_id has been set to null for ' . $affectedRows . ' records.'
            ], 200);
        }
    
        return response()->json(['message' => 'No records found with the specified department_head_id.'], 404);
    }

    public function removeJuniorDeptHeadId($junior_department_head_id)
    {
        // Find and update all records where department_head_id matches the given id
        $affectedRows = CampaignsAndTeams::where('junior_department_head_id', $junior_department_head_id)
            ->update(['junior_department_head_id' => null]);
    
        if ($affectedRows > 0) {
            return response()->json([
                'message' => 'junior_department_head_id has been set to null for ' . $affectedRows . ' records.'
            ], 200);
        }
    
        return response()->json(['message' => 'No records found with the specified junior_department_head_id.'], 404);
    }




    public function updateTeamByCampaignId(Request $request, $campaign_id)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'team_id' => 'required|exists:teams,id',
    ]);

    // Find the record with the given campaign_id
    $campaignsAndTeams = CampaignsAndTeams::where('campaign_id', $campaign_id)->firstOrFail();

    // If the `team_id` already exists in another record, set the previous `team_id` to null
    CampaignsAndTeams::where('team_id', $validatedData['team_id'])
        ->where('campaign_id', '!=', $campaign_id) // Exclude the current record by campaign_id
        ->update(['team_id' => null]);

    // Update the `team_id` for the current campaign_id
    $campaignsAndTeams->update(['team_id' => $validatedData['team_id']]);

    return response()->json([
        'message' => 'Team ID updated successfully',
        'data' => $campaignsAndTeams
    ], 200);
}

}
