<?php

namespace App\Http\Controllers;

use App\Models\HeadOfSales;
use Illuminate\Http\Request;

class HeadOfSalesController extends Controller
{

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'head_of_sales_name' => 'required|string|max:255',
            'commission' => 'nullable|integer',
            'email' => 'required|email|unique:head_of_sales,email',
            'password' => 'required|string|min:8',
            'head_of_sales_secret_id' => 'required|integer',
        ]);

        $headOfSales = HeadOfSales::create($validatedData);

        return response()->json($headOfSales, 201);
    }


    // GET - Retrieve all Head of Sales
    public function index()
    {
        $headOfSales = HeadOfSales::all();
        return response()->json($headOfSales);
    }

    // GET by ID - Retrieve a specific Head of Sales by ID
    public function show($id)
    {
        $headOfSales = HeadOfSales::find($id);

        if ($headOfSales) {
            return response()->json($headOfSales);
        } else {
            return response()->json(['message' => 'Head of Sales not found'], 404);
        }
    }

    // PUT - Update all fields of a specific Head of Sales by ID
    public function update(Request $request, $id)
    {
        $headOfSales = HeadOfSales::find($id);

        if ($headOfSales) {
            $validatedData = $request->validate([
                'head_of_sales_name' => 'sometimes|string|max:255',
                'commission' => 'sometimes|integer',
                'email' => 'sometimes|email|unique:head_of_sales,email,'.$id,
                'password' => 'sometimes|string|min:8',
                'head_of_sales_secret_id' => 'sometimes|integer',
            ]);

            $headOfSales->update($validatedData);
            return response()->json($headOfSales);
        } else {
            return response()->json(['message' => 'Head of Sales not found'], 404);
        }
    }

    // DELETE - Remove a Head of Sales by ID
    public function destroy($id)
    {
        $headOfSales = HeadOfSales::find($id);

        if ($headOfSales) {
            $headOfSales->delete();
            return response()->json(['message' => 'Head of Sales deleted']);
        } else {
            return response()->json(['message' => 'Head of Sales not found'], 404);
        }
    }
}
