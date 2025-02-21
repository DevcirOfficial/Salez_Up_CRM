<!-- // app/Http/Controllers/JsonDataController.php -->
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;




class JsonDataController extends Controller
{
    private $jsonPath = 'app/public/ActualData/Testing.json'; 

    public function getData()
    {
        try {
            if (!Storage::exists($this->jsonPath)) {
                return response()->json(['error' => 'JSON file not found'], 404);
            }
            $jsonContent = Storage::get($this->jsonPath);
            $data = json_decode($jsonContent, true);
            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to read JSON file: ' . $e->getMessage()], 500);
        }
    }

    public function updateData(Request $request)
    {
        try {
            $newData = $request->all();
            
            // Validate that the data is not empty
            if (empty($newData)) {
                return response()->json(['error' => 'No data provided'], 400);
            }

            // Encode the data with pretty print for better readability
            $jsonContent = json_encode($newData, JSON_PRETTY_PRINT);

            // Save the file
            Storage::put($this->jsonPath, $jsonContent);

            return response()->json(['message' => 'Data updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update JSON file'], 500);
        }
    }
}