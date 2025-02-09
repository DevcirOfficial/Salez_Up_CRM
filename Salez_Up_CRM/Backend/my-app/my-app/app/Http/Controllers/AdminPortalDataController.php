<?php

namespace App\Http\Controllers;

use App\Models\AdminPortalData;
use Illuminate\Http\Request;


class AdminPortalDataController extends Controller
{
    // Get all data
    public function index()
    {
        return response()->json(AdminPortalData::all(), 200);
    }

    // Get data by ID
    public function show($id)
    {
        $adminData = AdminPortalData::find($id);
        if ($adminData) {
            return response()->json($adminData, 200);
        } else {
            return response()->json(['error' => 'Admin data not found'], 404);
        }
    }


    // Get by Email

    public function showByEmail($admin_email)
{
    $adminData = AdminPortalData::where('admin_email', $admin_email)->first();
    if ($adminData) {
        return response()->json($adminData, 200);
    } else {
        return response()->json(['error' => 'Admin data not found'], 404);
    }
}


    // Create new data
    public function store(Request $request)
    {
        $validated = $request->validate([
            'admin_username' => 'required|string|max:255',
            'admin_email' => 'required|email|unique:admin_portal_data',
            'admin_password' => 'required|string|min:8',
        ]);

        $adminData = new AdminPortalData();
        $adminData->admin_username = $request->admin_username;
        $adminData->admin_email = $request->admin_email;
        $adminData->admin_password = $request->admin_password;
        $adminData->save();

        return response()->json($adminData, 201);
    }

    // Update existing data
    public function update(Request $request, $id)
    {
        $adminData = AdminPortalData::find($id);

        if ($adminData) {
            $validated = $request->validate([
                'admin_username' => 'required|string|max:255',
                'admin_email' => 'required|email|unique:admin_portal_data,admin_email,' . $id,
                'admin_password' => 'required|string|min:8',
            ]);

            $adminData->admin_username = $request->admin_username;
            $adminData->admin_email = $request->admin_email;
            $adminData->admin_password = $request->admin_password;
            $adminData->save();

            return response()->json($adminData, 200);
        } else {
            return response()->json(['error' => 'Admin data not found'], 404);
        }
    }

    // Delete data by ID
    public function destroy($id)
    {
        $adminData = AdminPortalData::find($id);

        if ($adminData) {
            $adminData->delete();
            return response()->json(['message' => 'Admin data deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Admin data not found'], 404);
        }
    }
}
