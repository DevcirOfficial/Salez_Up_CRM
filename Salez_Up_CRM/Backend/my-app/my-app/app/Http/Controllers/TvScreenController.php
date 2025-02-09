<?php


namespace App\Http\Controllers;

use App\Models\TvScreen;
use Illuminate\Http\Request;

class TvScreenController extends Controller
{
    public function index()
    {
        return TvScreen::all();
    }

    public function show($id)
    {
        return TvScreen::find($id);
    }

    public function store(Request $request)
    {
        $tvScreen = TvScreen::create($request->all());
        return response()->json($tvScreen, 201);
    }

    public function update(Request $request, $id)
    {
        $tvScreen = TvScreen::findOrFail($id);
        $tvScreen->update($request->all());
        return response()->json($tvScreen, 200);
    }

    public function updateAll(Request $request)
    {
        foreach ($request->all() as $tvScreenData) {
            $tvScreen = TvScreen::findOrFail($tvScreenData['id']);
            $tvScreen->update($tvScreenData);
        }
        return response()->json(['message' => 'All Tv Screens updated successfully'], 200);
    }

    public function destroy($id)
    {
        TvScreen::destroy($id);
        return response()->json(null, 204);
    }
}
