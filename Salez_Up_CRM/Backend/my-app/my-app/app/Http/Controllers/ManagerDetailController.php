<?php

namespace App\Http\Controllers;

use App\Models\ManagerDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ManagerDetailController extends Controller
{
    public function index()
    {
        $managers = ManagerDetail::with(['headOfSales', 'seniorOpsManager', 'admin'])->get();

        foreach ($managers as $manager) {
            if ($manager->manager_image_path) {
                $manager->manager_image_path = str_replace('/storage', '/public/storage', url(Storage::url($manager->manager_image_path)));
            }
        }

        return response()->json($managers, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'manager_name' => 'required|string',
            'Admin_Id' => 'required|integer',
            'manager_image_path' => 'sometimes|image|mimes:jpeg,png,jpg,gif',
            'manager_commision' => 'nullable|numeric',
            'manager_email' => 'required|email|unique:manager_details',
            'manager_password' => 'required|string|min:8',
            'manager_secret_id' => 'required|integer',
            'senior_ops_manager_id' => 'sometimes|integer',
            'head_of_sales_id' => 'sometimes|integer',
            'manager_role' => 'required|string'
        ]);

        if ($request->hasFile('manager_image_path')) {
            $image = $request->file('manager_image_path');
            $folderPath =  'Manager/' . $data['manager_role'].'/'.$data['manager_name'];
            $imagePath = $image->store($folderPath, 'public');
            $data['manager_image_path'] = $imagePath;
        }
        

        $manager = ManagerDetail::create($data);
        return response()->json($manager, 201);
    }

    public function show($id)
    {
        $manager = ManagerDetail::with(['headOfSales', 'seniorOpsManager', 'admin'])->findOrFail($id);
    
        if ($manager->manager_image_path) {
            $manager->manager_image_path = url(Storage::url($manager->manager_image_path));
        }
    
        return response()->json($manager, 200);
    }

    // public function update(Request $request, $id)
    // {
    //     $manager = ManagerDetail::findOrFail($id);
    //     $data  = $request->validate([
    //         'manager_name' => 'sometimes|string',
    //         'manager_image_path' => 'sometimes|string',
    //         'manager_commision' => 'nullable|numeric',
    //         'manager_email' => 'sometimes|email|unique:manager_details,manager_email,'.$id,
    //         'manager_password' => 'sometimes|string|min:8',
    //         'manager_secret_id' => 'sometimes|integer',
    //         'senior_ops_manager_id' => 'sometimes|integer|nullable',
    //         'head_of_sales_id' => 'sometimes|integer|nullable',
    //         'manager_role' => 'sometimes|string'
    //     ]);
        
    //     if ($request->hasFile('image_path')) {
    //         $newImage = $request->file('image_path');
    //         $folderPath = 'Manager/' . $manager['manager_role'] .$manager['manager_name'];

    //         // Delete the old image if it exists
    //         if ($manager->image_path && Storage::disk('public')->exists($manager->image_path)) {
    //             Storage::disk('public')->delete($manager->image_path);
    //         }

    //         // Store the new image
    //         $newImagePath = $newImage->store($folderPath, 'public');
    //         $data['image_path'] = $newImagePath;
    //     }

    //     $manager->update($data);
    //     return response()->json($manager, 200);
    // }

    public function update(Request $request, $id)
{
    $manager = ManagerDetail::findOrFail($id);

    $data = $request->validate([
        'manager_name' => 'sometimes|string',
        'manager_image_path' => 'sometimes|string',
        'manager_commision' => 'nullable|numeric',
        'manager_email' => 'sometimes|email|unique:manager_details,manager_email,' . $id,
        'manager_password' => 'sometimes|string|min:8',
        'manager_secret_id' => 'sometimes|integer',
        'senior_ops_manager_id' => 'sometimes|integer|nullable',
        'head_of_sales_id' => 'sometimes|integer|nullable',
        'manager_role' => 'sometimes|string'
    ]);

    if ($request->has('head_of_sales_id')) {
        $data['head_of_sales_id'] = $request->input('head_of_sales_id');
    }

    if ($request->has('senior_ops_manager_id')) {
        $data['senior_ops_manager_id'] = $request->input('senior_ops_manager_id');
    }

    if ($request->hasFile('manager_image_path')) {
        $newImage = $request->file('manager_image_path');
        $folderPath = 'Manager/' . $manager->manager_role . '/' . $manager->manager_name;

        if ($manager->manager_image_path && Storage::disk('public')->exists($manager->manager_image_path)) {
            Storage::disk('public')->delete($manager->manager_image_path);
        }

        // Store the new image
        $newImagePath = $newImage->store($folderPath, 'public');
        $data['manager_image_path'] = $newImagePath;
    }

    $manager->update($data);
    return response()->json($manager, 200);
}

    public function destroy($id)
    {
        $manager = ManagerDetail::findOrFail($id);
        if ($manager->manager_image_path && Storage::disk('public')->exists($manager->manager_image_path)) {
            $folderPath = dirname($manager->manager_image_path);  
            Storage::disk('public')->deleteDirectory($folderPath); 
        }

        $manager->delete();
        return response()->json(null, 204);
    }
}
