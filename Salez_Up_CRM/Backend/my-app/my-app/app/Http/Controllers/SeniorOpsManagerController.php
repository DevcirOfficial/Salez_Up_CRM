<?php

namespace App\Http\Controllers;

use App\Models\SeniorOpsManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SeniorOpsManagerController extends Controller
{
    // Get all senior ops managers
    public function getAll()
    {
        return response()->json(SeniorOpsManager::all(), 200);
    }

    // Get a senior ops manager by ID
    public function getById($id)
    {
        $manager = SeniorOpsManager::find($id);
        if ($manager) {
            return response()->json($manager, 200);
        } else {
            return response()->json(['message' => ' Senior Ops Manager not found'], 404);
        }
    }

    // Create a new senior ops manager
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ops_manager_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:senior_ops_managers',
            'password' => 'required|string|min:8',
            'ops_manager_secret_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $manager = SeniorOpsManager::create([
            'ops_manager_name' => $request->ops_manager_name,
            'commission' => $request->commission,
            'email' => $request->email,
            'password' => $request->password,
            'ops_manager_secret_id' => $request->ops_manager_secret_id
        ]);

        return response()->json($manager, 201);
    }

    // Update all details of a senior ops manager by ID
    public function updateAll(Request $request, $id)
    {
        $manager = SeniorOpsManager::find($id);
        if (!$manager) {
            return response()->json(['message' => 'Senior Ops Manager not found'], 404);
        }

        $manager->update($request->all());
        return response()->json($manager, 200);
    }

    // Update specific details of a senior ops manager by ID
    public function updateById(Request $request, $id)
    {
        $manager = SeniorOpsManager::find($id);
        if (!$manager) {
            return response()->json(['message' => 'Senior Ops Manager not found'], 404);
        }

        $manager->fill($request->only(['ops_manager_name', 'commission', 'email', 'password','ops_manager_secret_id']));
        $manager->save();
        return response()->json($manager, 200);
    }

    // Delete a senior ops manager by ID
    public function delete($id)
    {
        $manager = SeniorOpsManager::find($id);
        if (!$manager) {
            return response()->json(['message' => 'Senior Ops Manager not found'], 404);
        }

        $manager->delete();
        return response()->json(['message' => 'Senior Ops Manager deleted'], 200);
    }
}

