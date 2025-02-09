<?php

namespace App\Http\Controllers;

use App\Models\Manager;
use Illuminate\Http\Request;

class ManagerController extends Controller
{
    // POST: Create a new Manager
    public function store(Request $request)
    {
        $data = $request->validate([
            'manager_name' => 'required|string',
            'commission' => 'nullable|integer',
            'email' => 'required|email|unique:managers',
            'password' => 'required|string',
            'manager_secret_id' => 'required|integer',
        ]);

        $manager = Manager::create($data);

        return response()->json($manager, 201);
    }

    // GET: Retrieve all Managers
    public function index()
    {
        return response()->json(Manager::all(), 200);
    }

    // GET: Retrieve a Manager by ID
    public function show($id)
    {
        $manager = Manager::findOrFail($id);
        return response()->json($manager, 200);
    }

    // PUT: Update a Manager by ID
    public function update(Request $request, $id)
    {
        $manager = Manager::findOrFail($id);

        $data = $request->validate([
            'manager_name' => 'sometimes|required|string',
            'commission' => 'sometimes|required|integer',
            'email' => 'sometimes|required|email|unique:managers,email,' . $id,
            'password' => 'sometimes|required|string',
            'manager_secret_id' => 'sometimes|required|integer',
        ]);

        $manager->update($data);

        return response()->json($manager, 200);
    }


    public function destroy($id)
    {
        $manager = Manager::findOrFail($id);
        $manager->delete();

        return response()->json(null, 204);
    }
}
