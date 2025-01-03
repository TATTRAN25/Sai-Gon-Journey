<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TourController;
use App\Http\Controllers\HotelController;

// Nhóm các route với prefix "v1"
Route::prefix('v1')->group(function () {
    // Route lấy thông tin người dùng đã xác thực
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    // Đăng ký các routes cho TourController
    Route::apiResource('tours', TourController::class);
    Route::apiResource('hotels', HotelController::class);
});