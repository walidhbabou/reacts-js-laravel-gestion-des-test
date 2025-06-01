<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:etudiants,email',
            'password' => 'required|string|min:8|confirmed',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        // Générer un avatar aléatoire avec DiceBear
        $avatarSeed = Str::random(10);
        $avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed={$avatarSeed}";

        $etudiant = Etudiant::create([
            'nom' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'login' => $request->email, // Using email as login
            'note1' => 0,
            'note2' => 0,
            'moyenne' => 0,
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
        ]);

        // Create token using Sanctum
        $token = $etudiant->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $etudiant->id,
                'name' => $etudiant->nom,
                'email' => $etudiant->email,
                'avatar' => $avatarUrl,
                'latitude' => $etudiant->latitude,
                'longitude' => $etudiant->longitude,
            ],
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $etudiant = Etudiant::where('email', $request->email)->first();

        if (!$etudiant || !Hash::check($request->password, $etudiant->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants fournis sont incorrects.'],
            ]);
        }

        // Delete old tokens
        $etudiant->tokens()->delete();

        // Create new token
        $token = $etudiant->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $etudiant->id,
                'name' => $etudiant->nom,
                'email' => $etudiant->email,
                'login' => $etudiant->login,
                'note1' => $etudiant->note1,
                'note2' => $etudiant->note2,
                'moyenne' => $etudiant->moyenne,
                'latitude' => $etudiant->latitude,
                'longitude' => $etudiant->longitude,
            ],
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        try {
            // Delete the current token
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Déconnexion réussie']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la déconnexion',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->nom,
            'email' => $user->email,
            'login' => $user->login,
            'note1' => $user->note1,
            'note2' => $user->note2,
            'moyenne' => $user->moyenne,
        ]);
    }
}
