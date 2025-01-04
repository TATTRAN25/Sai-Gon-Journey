<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');

Route::prefix('auth')->group(function() {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::prefix('manage_user')->group(function() {
    Route::post('list_user', [UserController::class, 'list_user']);
    Route::get('delete_user', [UserController::class, 'delete_user']);
    Route::post('update_user', [UserController::class, 'update_user']);
});