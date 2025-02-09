<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    // Get all foods
    public function index()
    {
        return Food::all();
    }

    // Get food by ID
    public function show($id)
    {
        return Food::findOrFail($id);
    }

    // Create a new food
    public function store(Request $request)
    {
        $food = Food::create($request->all());
        return response()->json($food, 201);
    }

    // Update food by ID
    public function update(Request $request, $id)
    {
        $food = Food::findOrFail($id);
        $food->update($request->all());
        return response()->json($food, 200);
    }

    // Delete food by ID
    public function destroy($id)
    {
        Food::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    // Update all foods
    public function updateAll(Request $request)
    {
        Food::query()->update($request->all());
        return response()->json('All foods updated successfully', 200);
    }
}
