<?php

namespace App\Http\Controllers;

use App\Models\DepartmentHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DepartmentHeadController extends Controller
{
    // Get all Department Heads
    public function index()
    {
        $departmentHeads = DepartmentHead::with('manager')->get();
        $departmentHeads->transform(function ($departmentHead) {
            if ($departmentHead->image_path) {
                $departmentHead->image_path = str_replace('/storage', '/public/storage', url(Storage::url($departmentHead->image_path)));
            }
            return $departmentHead;
        });
        return response()->json($departmentHeads, 200);
    }

    // Get a single Department Head by ID
    public function show($id)
    {
        $departmentHead = DepartmentHead::with('manager')->find($id);
        if ($departmentHead->image_path) {
            $departmentHead->image_path = url(Storage::url($departmentHead->image_path));
        }
        if (!$departmentHead) {
            return response()->json(['message' => 'Department Head not found'], 404);
        }


        return response()->json($departmentHead, 200);
    }


    // Create a new Department Head
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'start_date' => 'required|date',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif',
            'manager_id' => 'required|exists:manager_details,id',
            'commission' => 'nullable|integer',
        ]);

        if ($request->hasFile('image_path')) {
            $image = $request->file('image_path');
            $folderPath = 'department_Head_images/' . $data['first_name'] . $data['last_name'];
            $imagePath = $image->store($folderPath, 'public');
            $data['image_path'] = $imagePath;
        }

        $departmentHead = DepartmentHead::create($data);
        return response()->json($departmentHead, 201);
    }

    // Update a Department Head by ID
    public function update(Request $request, $id)
    {
        $departmentHead = DepartmentHead::find($id);
        if (!$departmentHead) {
            return response()->json(['message' => 'Department Head not found'], 404);
        }

        $validatedData = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'start_date' => 'sometimes|date',
            'image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'commission' => 'nullable|integer',
        ]);

        // Handle file upload if a new image is provided
        if ($request->hasFile('image_path')) {
            $newImage = $request->file('image_path');
            $folderPath = 'department_Head_images/' . $departmentHead['first_name'] . $departmentHead['last_name'];

            // Delete the old image if it exists
            if ($departmentHead->image_path && Storage::disk('public')->exists($departmentHead->image_path)) {
                Storage::disk('public')->delete($departmentHead->image_path);
            }

            // Store the new image
            $newImagePath = $newImage->store($folderPath, 'public');
            $validatedData['image_path'] = $newImagePath;
        }


        $departmentHead->update($validatedData);
        return response()->json($departmentHead);
    }

    // Delete a Department Head by ID
    public function destroy($id)
    {
        $departmentHead = DepartmentHead::find($id);

        if (!$departmentHead) {
            return response()->json(['message' => 'Department Head not found'], 404);
        }

        if ($departmentHead->image_path && Storage::disk('public')->exists($departmentHead->image_path)) {
            $folderPath = dirname($departmentHead->image_path);
            Storage::disk('public')->deleteDirectory($folderPath);
        }

        $departmentHead->delete();
        return response()->json(['message' => 'Department Head deleted']);
    }
}
