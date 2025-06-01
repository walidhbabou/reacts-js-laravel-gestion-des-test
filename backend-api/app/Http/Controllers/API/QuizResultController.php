<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Etudiant;

class QuizResultController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'score' => 'required|numeric|min:0|max:20',
            'quiz_type' => 'required|string|in:javascript,php',
        ]);

        // Find the authenticated etudiant
        $etudiant = Auth::user();

        if (!$etudiant) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $quizType = $request->quiz_type;
        $score = $request->score;

        // Update note based on quiz type
        if ($quizType === 'javascript') {
            $etudiant->note1 = $score;
        } elseif ($quizType === 'php') {
            $etudiant->note2 = $score;
        }

        // Calculate and update average
        // Assuming both note1 and note2 need to be present to calculate average
        if ($etudiant->note1 !== null && $etudiant->note2 !== null) {
             $etudiant->moyenne = ($etudiant->note1 + $etudiant->note2) / 2;
        }

        $etudiant->save();

        return response()->json(['success' => true, 'message' => 'Quiz result saved successfully!']);
    }
}
