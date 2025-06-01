<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Image; // Import the Image model
use Illuminate\Support\Facades\Storage; // Import Storage facade
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Response; // Import Response facade

class ImageController extends Controller
{
    /**
     * Display a listing of images (without binary data).
     */
    public function index()
    {
        try {
            // Fetch all images from the database, excluding the binary data
            $images = Image::select('id', 'name', 'mime_type', 'size', 'alt_text', 'description', 'created_at', 'updated_at')->latest()->get();

            // Append the URL for serving the image and formatted size
            $images->each(function($image) {
                $image->url = url('/api/images/' . $image->id . '/serve');
                $image->formatted_size = $this->formatBytes($image->size);
            });

            return response()->json([
                'success' => true,
                'data' => $images,
                'message' => 'Images récupérées avec succès (sans données binaires)'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created image (with binary data).
     */
    public function store(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
            'alt_text' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            // Get the uploaded file
            $uploadedFile = $request->file('image');

            // Read the binary content of the file and encode it in base64
            $binaryData = $uploadedFile->get();
            $base64Data = base64_encode($binaryData);

            // Create a new Image record in the database with base64 encoded data
            $image = Image::create([
                'name' => $uploadedFile->getClientOriginalName(),
                'image_data' => $base64Data, // Store the base64 encoded data
                'mime_type' => $uploadedFile->getMimeType(),
                'size' => $uploadedFile->getSize(),
                'alt_text' => $request->alt_text,
                'description' => $request->description,
            ]);

            // Return only metadata in response (exclude binary data)
            $imageResponse = [
                'id' => $image->id,
                'name' => $image->name,
                'mime_type' => $image->mime_type,
                'size' => $image->size,
                'formatted_size' => $this->formatBytes($image->size),
                'alt_text' => $image->alt_text,
                'description' => $image->description,
                'created_at' => $image->created_at,
                'updated_at' => $image->updated_at,
                'url' => url('/api/images/' . $image->id . '/serve')
            ];

            return response()->json([
                'success' => true,
                'data' => $imageResponse,
                'message' => 'Image uploadée avec succès!'
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Image upload error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'upload de l\'image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Serve the specified image binary data.
     */
    public function serve($id)
    {
        try {
            // Find the image by ID, selecting only the necessary columns including the base64 data
            $image = Image::select('image_data', 'mime_type', 'name')->findOrFail($id);

            // Decode the base64 data back to binary
            $binaryData = base64_decode($image->image_data);

            // Return the binary data as a response with appropriate headers
            return Response::make($binaryData, 200, [
                'Content-Type' => $image->mime_type,
                'Content-Disposition' => 'inline; filename="' . $image->name . '"',
                'Cache-Control' => 'public, max-age=3600',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Image non trouvée ou erreur lors du service',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Display the specified image (metadata only).
     */
    public function show($id)
    {
        try {
            // Find the image by ID, excluding the binary data
            $image = Image::select('id', 'name', 'mime_type', 'size', 'alt_text', 'description', 'created_at', 'updated_at')->findOrFail($id);
            $image->url = url('/api/images/' . $image->id . '/serve');
            $image->formatted_size = $this->formatBytes($image->size);

            return response()->json([
                'success' => true,
                'data' => $image,
                'message' => 'Image trouvée (métadonnées seulement)'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Image non trouvée',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Remove the specified image (and its binary data).
     */
    public function destroy($id)
    {
        try {
            $image = Image::findOrFail($id);

            // Deleting the model will also delete the binary data from the database row
            $image->delete();

            return response()->json([
                'success' => true,
                'message' => 'Image supprimée avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');

        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, $precision) . ' ' . $units[$i];
    }
}