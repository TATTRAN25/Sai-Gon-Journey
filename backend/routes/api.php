<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TourController;
use App\Http\Controllers\HotelController;

// Nhóm các route với prefix "v1"
Route::prefix('v1')->group(function () {
    // Routes cho HotelController
    Route::apiResource('hotels', HotelController::class);

    // Routes cho hotel_rooms
    Route::get('/hotels/{hotelId}/rooms', [HotelController::class, 'getRooms']);
    Route::post('/hotels/{hotelId}/rooms', [HotelController::class, 'addRoom']);
    Route::put('/hotels/{hotelId}/rooms/{roomId}', [HotelController::class, 'updateRoom']);
    Route::delete('/hotels/{hotelId}/rooms/{roomId}', [HotelController::class, 'deleteRoom']);

    // Routes cho TourController
    Route::apiResource('tours', TourController::class);

    // Routes cho tour_schedules
    Route::get('/tours/{tourId}/schedules', [TourController::class, 'getSchedules']);
    Route::post('/tours/{tourId}/schedules', [TourController::class, 'addSchedule']);
    Route::put('/tours/{tourId}/schedules/{scheduleId}', [TourController::class, 'updateSchedule']);
    Route::delete('/tours/{tourId}/schedules/{scheduleId}', [TourController::class, 'deleteSchedule']);
});