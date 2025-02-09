<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignsAndTeams;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CampaignController extends Controller
{
    // Get all campaigns
    public function index()
    {
        $campaigns = Campaign::with('manager')->get(); // Eager load manager data
        $campaigns->transform(function ($campaign) {
            if ($campaign->image_path) {
                $campaign->image_path = str_replace('/storage', '/public/storage', url(Storage::url($campaign->image_path)));
            }
            return $campaign;
        });
        return response()->json($campaigns);
    }

    // Get campaign by ID
    public function show($id)
    {
        $campaign = Campaign::with('manager')->find($id);
        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }
        return response()->json($campaign);
    }

    // Create a new campaign
    public function store(Request $request)
    {
       $data = $request->validate([
            'campaign_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'manager_id' => 'required',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif'
        ]);

        if ($request->hasFile('image_path')) {
            $image = $request->file('image_path');
            $folderPath = 'campaign/' . $data['campaign_name'];
            $imagePath = $image->store($folderPath, 'public');
            $data['image_path'] = $imagePath;
        }

        $campaign = Campaign::create($data);

        return response()->json($campaign, 201);
    }

    
    public function update(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);

        $data = $request->validate([
            'campaign_name' => 'sometimes|required|string|max:255',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date',
            'manager_id' => 'sometimes|required|exists:manager_details,id',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif'
        ]);

        // Handle file upload if a new image is provided
        if ($request->hasFile('image_path')) {
            $newImage = $request->file('image_path');
            $folderPath = 'campaign/' . $campaign->campaign_name;

            // Delete the old image if it exists
            if ($campaign->image_path && Storage::disk('public')->exists($campaign->image_path)) {
                Storage::disk('public')->delete($campaign->image_path);
            }

            // Store the new image
            $newImagePath = $newImage->store($folderPath, 'public');
            $data['image_path'] = $newImagePath;
        }

        // Update the campaign data
        $campaign->update($data);

        return response()->json($campaign, 200);
    }







    // Delete a campaign by ID
    public function destroy($id)
    {
        $campaign = Campaign::find($id);
        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }
        if ($campaign->image_path && Storage::disk('public')->exists($campaign->image_path)) {
            $folderPath = dirname($campaign->image_path);
            Storage::disk('public')->deleteDirectory($folderPath);
        }
        $campaign->delete();
        return response()->json(['message' => 'Campaign deleted']);
    }



    public function updateCampaignNameByCampaignId(Request $request, $campaign_id)
    {
        // Validate the incoming request
        $request->validate([
            'campaign_name' => 'required|string|max:255',
        ]);
    
        // Find the record in the campaigns_and_teams table
        $campaignTeam = CampaignsAndTeams::where('campaign_id', $campaign_id)->first();
    
        if (!$campaignTeam) {
            return response()->json(['message' => 'Campaign not found in campaigns_and_teams'], 404);
        }
    
        // Find the campaign in the campaigns table using campaign_id
        $campaign = Campaign::find($campaign_id);
    
        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }
    
        // Update the campaign_name
        $campaign->campaign_name = $request->campaign_name;
        $campaign->save();
    
        return response()->json(['message' => 'Campaign name updated successfully', 'campaign' => $campaign]);
    }
    
}
