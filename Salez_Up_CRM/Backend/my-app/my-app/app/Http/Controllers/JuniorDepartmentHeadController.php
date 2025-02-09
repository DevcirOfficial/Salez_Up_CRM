<?php

// app/Http/Controllers/JuniorDepartmentHeadController.php
namespace App\Http\Controllers;

use App\Models\JuniorDepartmentHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JuniorDepartmentHeadController extends Controller
{
    // Get all Junior Department Heads with manager data
    public function index()
    {
        $juniordepartmentHeads = JuniorDepartmentHead::with('manager', 'deptHead')->get();
        $juniordepartmentHeads->transform(function ($juniordepartmentHead) {
            if ($juniordepartmentHead->image_path) {
                $juniordepartmentHead->image_path = str_replace('/storage', '/public/storage', url(Storage::url($juniordepartmentHead->image_path)));

            }
            return $juniordepartmentHead;
        });
        return response()->json($juniordepartmentHeads, 200);
    }

    // Create a new Junior Department Head
    public function store(Request $request)
    {
        $data  = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'start_date' => 'required|date',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif',
            'Dept_Head_id' => 'sometimes|integer',
            'manager_id' => 'required|exists:manager_details,id',
            'commission' => 'nullable|integer'
        ]);

        if ($request->hasFile('image_path')) {
            $image = $request->file('image_path');
            $folderPath = 'junior_department_Head_images/' . $data['first_name'] . $data['last_name'];
            $imagePath = $image->store($folderPath, 'public');
            $data['image_path'] = $imagePath;
        }

        $juniorDepartmentHead = JuniorDepartmentHead::create($data);

        return response()->json($juniorDepartmentHead, 201);
    }

    // Get a Junior Department Head by ID
    public function show($id)
    {
        $juniorDepartmentHead = JuniorDepartmentHead::with('manager')->find($id);
        if ($juniorDepartmentHead->image_path) {
            $juniorDepartmentHead->image_path = url(Storage::url($juniorDepartmentHead->image_path));
        }
        if (!$juniorDepartmentHead) {
            return response()->json(['message' => 'Junior Department Head not found'], 404);
        }

        return response()->json($juniorDepartmentHead, 200);
    }

    // Update a Junior Department Head by ID
    public function update(Request $request, $id)
    {
        $juniorDepartmentHead = JuniorDepartmentHead::find($id);

        if (!$juniorDepartmentHead) {
            return response()->json(['message' => 'Junior Department Head not found'], 404);
        }

        $validatedData = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'start_date' => 'sometimes|date',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'Dept_Head_id' => 'sometimes|integer',
            'commission' => 'nullable|integer',
        ]);

        if ($request->hasFile('image_path')) {
            $newImage = $request->file('image_path');
            $folderPath = 'junior_department_Head_images/' . $juniorDepartmentHead['first_name'] . $juniorDepartmentHead['last_name'];

            // Delete the old image if it exists
            if ($juniorDepartmentHead->image_path && Storage::disk('public')->exists($juniorDepartmentHead->image_path)) {
                Storage::disk('public')->delete($juniorDepartmentHead->image_path);
            }

            // Store the new image
            $newImagePath = $newImage->store($folderPath, 'public');
            $validatedData['image_path'] = $newImagePath;
        }

        $juniorDepartmentHead->update($validatedData);

        return response()->json($juniorDepartmentHead, 200);
    }

    // Delete a Junior Department Head by ID
    public function destroy($id)
    {
        $juniorDepartmentHead = JuniorDepartmentHead::find($id);

        if (!$juniorDepartmentHead) {
            return response()->json(['message' => 'Junior Department Head not found'], 404);
        }
        
        if ($juniorDepartmentHead->image_path && Storage::disk('public')->exists($juniorDepartmentHead->image_path)) {
            $folderPath = dirname($juniorDepartmentHead->image_path);  
            Storage::disk('public')->deleteDirectory($folderPath); 
        }

        $juniorDepartmentHead->delete();

        return response()->json(['message' => 'Junior Department Head deleted successfully'], 200);
    }


}
