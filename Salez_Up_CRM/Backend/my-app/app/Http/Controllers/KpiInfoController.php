<?php

namespace App\Http\Controllers;

use App\Models\KpiInfo;
use Illuminate\Http\Request;

class KpiInfoController extends Controller
{
    public function index()
    {
        return KpiInfo::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'kpi_name' => 'required|string|max:255',
        ]);

        return KpiInfo::create($request->all());
    }

    public function show($id)
    {
        return KpiInfo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kpi_name' => 'required|string|max:255',
        ]);

        $kpiInfo = KpiInfo::findOrFail($id);
        $kpiInfo->update($request->all());

        return $kpiInfo;
    }

    public function updateByName(Request $request, $kpi_name)
{
    $request->validate([
        'kpi_name' => 'required|string|max:255',
    ]);

    // Find the record by kpi_name
    $kpiInfo = KpiInfo::where('kpi_name', $kpi_name)->firstOrFail();

    // Update the record with the request data
    $kpiInfo->update($request->all());

    return $kpiInfo;
}

    public function destroy($id)
    {
        $kpiInfo = KpiInfo::findOrFail($id);
        $kpiInfo->delete();

        return response()->json(null, 204);
    }
}