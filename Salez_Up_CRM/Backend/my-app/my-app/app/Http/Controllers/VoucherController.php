<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    // Get all vouchers
    public function index()
    {
        return Voucher::all();
    }

    // Get voucher by ID
    public function show($id)
    {
        return Voucher::findOrFail($id);
    }

    // Create a new voucher
    public function store(Request $request)
    {
        $voucher = Voucher::create($request->all());
        return response()->json($voucher, 201);
    }

    // Update voucher by ID
    public function update(Request $request, $id)
    {
        $voucher = Voucher::findOrFail($id);
        $voucher->update($request->all());
        return response()->json($voucher, 200);
    }

    // Delete voucher by ID
    public function destroy($id)
    {
        Voucher::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    // Update all vouchers
    public function updateAll(Request $request)
    {
        Voucher::query()->update($request->all());
        return response()->json('All vouchers updated successfully', 200);
    }
}
