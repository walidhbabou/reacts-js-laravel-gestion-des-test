<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ImageController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\QuizResultController;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// Articles
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('articles', ArticleController::class);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('students', App\Http\Controllers\Api\StudentController::class);

// Image routes
Route::prefix('images')->group(function () {
    Route::get('/', [ImageController::class, 'index']);          // GET /api/images - List all images
    Route::post('/', [ImageController::class, 'store']);         // POST /api/images - Upload new image
    Route::get('{id}', [ImageController::class, 'show']);        // GET /api/images/{id} - Get image metadata
    Route::get('{id}/serve', [ImageController::class, 'serve']); // GET /api/images/{id}/serve - Serve image binary
    Route::delete('{id}', [ImageController::class, 'destroy']);  // DELETE /api/images/{id} - Delete image
});

// Quiz Results routes
Route::middleware('auth:sanctum')->post('/quiz-results', [QuizResultController::class, 'store']);

// --- Student routes (public) ---
Route::get('/students', [StudentController::class, 'index']);
Route::post('/students', [StudentController::class, 'store']);
Route::post('/students/update-location', [StudentController::class, 'updateLocation']);
