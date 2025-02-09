<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // POST: Create a new Team
    public function store(Request $request)
    {
        $data = $request->validate([
            'team_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'manager_id' => 'required|integer|exists:manager_details,id', 
        ]);

        $team = Team::create($data);

        return response()->json($team, 201);
    }

    // GET: Retrieve all Teams
    public function index()
    {
        return response()->json(Team::all(), 200);
    }

    // GET: Retrieve a Team by ID
    public function show($id)
    {
        $team = Team::findOrFail($id);
        return response()->json($team, 200);
    }

    // PUT: Update a Team by ID
    public function update(Request $request, $id)
    {
        $team = Team::findOrFail($id);

        $data = $request->validate([
            'team_name' => 'sometimes|required|string|max:255',
            'start_date' => 'sometimes|required|date',
            'manager_id' => 'sometimes|required|integer|exists:managers,id', // Validate manager_id
        ]);

        $team->update($data);

        return response()->json($team, 200);
    }

    // DELETE: Delete a Team by ID
    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        $team->delete();

        return response()->json(null, 204);
    }




    public function updateTeamNameFromLeader(Request $request, $team_id)
{
    // Validate the new team name
    $request->validate([
        'team_name' => 'required|string|max:255',
    ]);

    // Find the team by the team_id
    $team = Team::find($team_id);

    if (!$team) {
        return response()->json(['message' => 'Team not found'], 404);
    }

    // Update the team name
    $team->team_name = $request->team_name;
    $team->save();

    return response()->json(['message' => 'Team name updated successfully', 'team' => $team], 200);
}





public function destroyByTeamLeader($team_id)
{

    $team = Team::where('id', $team_id)->first();

    if (!$team) {

        return response()->json(['message' => 'Team not found'], 404);
    }

    $team->delete();
    return response()->json(['message' => 'Team deleted successfully'], 204);
}


}
