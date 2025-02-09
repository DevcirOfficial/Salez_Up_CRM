<?php

namespace App\Http\Controllers;

use App\Models\TeamAndTeamLeader;
use Illuminate\Http\Request;

class TeamAndTeamLeaderController extends Controller
{
    
    public function index()
    {
        return TeamAndTeamLeader::with(['team', 'teamLeader'])->get();
    }

    
    public function show($id)
    {
        return TeamAndTeamLeader::with(['team', 'teamLeader'])->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'team_leader_id' => 'nullable|exists:team_leaders,id',
        ]);

        return TeamAndTeamLeader::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'team_leader_id' => 'nullable|exists:team_leaders,id',
        ]);

        $teamAndTeamLeader = TeamAndTeamLeader::findOrFail($id);
        $teamAndTeamLeader->update($request->all());

        return $teamAndTeamLeader;
    }

    // Delete a team and team leader relationship by ID
    public function destroy($id)
    {
        $teamAndTeamLeader = TeamAndTeamLeader::findOrFail($id);
        $teamAndTeamLeader->delete();

        return response()->json(['message' => 'Record deleted successfully']);
    }

    public function updateTeamLeader(Request $request)
    {
        $request->validate([
            'team_leader_id' => 'required|exists:team_leaders,id',
            'team_ids' => 'array',
            'team_ids.*' => 'exists:teams,id',
        ]);

        $teamLeaderId = $request->input('team_leader_id');
        $teamIds = $request->input('team_ids');

        // If team_ids is an empty array, set team_leader_id to null wherever it is found
        if (empty($teamIds)) {
            TeamAndTeamLeader::where('team_leader_id', $teamLeaderId)
                ->update(['team_leader_id' => null]);
        } else {
            // Update team_leader_id for specified team_ids
            TeamAndTeamLeader::whereIn('team_id', $teamIds)
                ->update(['team_leader_id' => $teamLeaderId]);

            // Set team_leader_id to null for any other teams that are not in the team_ids array
            TeamAndTeamLeader::where('team_leader_id', $teamLeaderId)
                ->whereNotIn('team_id', $teamIds)
                ->update(['team_leader_id' => null]);
        }

        return response()->json(['message' => 'Team leader updated successfully']);
    }

    public function Team_Leader_Id_Update(Request $request, $team_leader_id)
    {
        $request->validate([
            'team_leader_id' => 'nullable|exists:team_leaders,id',
        ]);

        TeamAndTeamLeader::where('team_leader_id', $team_leader_id)->update(['team_leader_id' => null]);

        return response()->json(['message' => 'Team leader ID set to null successfully from all records']);
    }

    public function updateLeaderKpi(Request $request, $team_leader_id)
    {
        $validatedData = $request->validate([
            'kpi_data' => 'required|json',
        ]);

        $leaderKpi = TeamAndTeamLeader::where('team_leader_id', $team_leader_id)->firstOrFail();

        $leaderKpi->update($validatedData);

        return response()->json($leaderKpi, 200);
    }


    public function updateKpi(Request $request, $team_id)
    {
        $validatedData = $request->validate([
            'kpi_data' => 'required|json',
        ]);

        $leaderKpi = TeamAndTeamLeader::where('team_id', $team_id)->firstOrFail();

        $leaderKpi->update($validatedData);

        return response()->json($leaderKpi, 200);
    }

    // get team leader by team_id

//     public function getTeamLeaderByTeamId($team_id)
// {
//     $teamAndTeamLeader = TeamAndTeamLeader::with('teamLeader')
//         ->where('team_id', $team_id)
//         ->firstOrFail();

//     if (!$teamAndTeamLeader->teamLeader) {
//         return response()->json([
//             'message' => 'No team leader assigned to this team'
//         ], 404);
//     }

//     return response()->json([
//         'team_leader' => $teamAndTeamLeader->teamLeader
//     ]);
// }


public function getTeamLeaderByTeamId($team_id)
{
    $teamAndTeamLeader = TeamAndTeamLeader::with('teamLeader')
        ->where('team_id', $team_id)
        ->firstOrFail();

    if (!$teamAndTeamLeader->teamLeader) {
        return response()->json([
            'message' => 'No team leader assigned to this team'
        ], 404);
    }

    return response()->json([
        'team_and_team_leader' => $teamAndTeamLeader
    ]);
}



}
