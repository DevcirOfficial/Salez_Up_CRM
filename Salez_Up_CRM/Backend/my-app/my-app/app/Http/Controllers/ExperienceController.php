<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return Experience::all();
    }

    public function store(Request $request)
    {
        $experience = Experience::create($request->all());
        return response()->json($experience, 201);
    }

    public function show($id)
    {
        return Experience::find($id);
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);
        $experience->update($request->all());
        return response()->json($experience, 200);
    }

    public function destroy($id)
    {
        Experience::destroy($id);
        return response()->json(null, 204);
    }

    public function updateAll(Request $request)
    {
        $experiences = Experience::all();
        foreach ($experiences as $experience) {
            $experience->update($request->all());
        }
        return response()->json($experiences, 200);
    }
}
