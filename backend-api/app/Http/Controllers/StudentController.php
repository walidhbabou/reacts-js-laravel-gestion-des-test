<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Etudiant;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            // Fetch all etudiants from the database
            $etudiants = Etudiant::all();

            return response()->json($etudiants);

        } catch (\Exception $e) {
            \Log::error('Error fetching etudiants: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des étudiants.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:20',
            'prenom' => 'required|string|max:255', // Keep validation for prenom even if not stored in etudiants table
            'cne' => 'required|string|unique:etudiants,login|max:20', // Validate cne and ensure it's unique in the login column of etudiants table
            'note1' => 'nullable|numeric|min:0|max:20',
            'note2' => 'nullable|numeric|min:0|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            // Create a new Etudiant record
            $etudiant = Etudiant::create([
                'login' => $request->cne, // Map cne to login
                'nom' => $request->nom,
                'note1' => $request->note1,
                'note2' => $request->note2,
                // moyenne, longitude, latitude are not provided by frontend and not set here
                // password and email are not provided by frontend and not set here
            ]);

            return response()->json([
                'message' => 'Étudiant ajouté avec succès',
                'student' => $etudiant // Return the created etudiant (as student for frontend compatibility)
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Error saving etudiant: ' . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'ajout de l\'étudiant.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        // Cette méthode n'est pas utilisée dans les routes api.php que vous avez montrées,
        // mais elle est typique pour afficher un seul étudiant.
        // return response()->json($student);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        // Cette méthode n'est pas utilisée dans les routes api.php que vous avez montrées,
        // mais elle serait utilisée pour modifier un étudiant existant.
    }

    /**
     * Update student's location coordinates
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateLocation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:etudiants,id',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            $etudiant = Etudiant::findOrFail($request->id);
            $etudiant->update([
                'latitude' => $request->latitude,
                'longitude' => $request->longitude
            ]);

            return response()->json([
                'message' => 'Position mise à jour avec succès',
                'student' => $etudiant
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error updating student location: ' . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de la position.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        // Cette méthode n'est pas utilisée dans les routes api.php que vous avez montrées,
        // mais elle serait utilisée pour supprimer un étudiant.
    }
}
