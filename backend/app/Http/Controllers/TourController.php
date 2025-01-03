<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;

class TourController extends Controller
{
    // Lấy danh sách tất cả tour
    public function index()
    {
        $tours = Tour::all();
        return response()->json($tours);
    }

    // Lấy thông tin chi tiết của một tour
    public function show($id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json(['message' => 'Tour not found'], 404);
        }
        return response()->json($tour);
    }

    // Thêm mới tour
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|regex:/^[a-zA-Z ]+$/',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric|max:1000000000',
            'start_date' => 'required|date|before_or_equal:today',
            'end_date' => 'required|date|after:start_date|before:start_date+3month',
            'image' => 'nullable|string|in:storage/app/public/tours',
        ]);

        $tour = Tour::create($request->all());
        return response()->json($tour, 201);
    }

    // Cập nhật thông tin tour
    public function update(Request $request, $id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json(['message' => 'Tour not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:100|regex:/^[a-zA-Z ]+$/',
            'description' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|max:1000000000',
            'start_date' => 'sometimes|date|before_or_equal:today',
            'end_date' => 'sometimes|date|after:start_date|before:start_date+3month',
            'image' => 'nullable|string|in:storage/app/public/tours',
        ]);

        $tour->update($request->all());
        return response()->json($tour);
    }

    // Xóa tour
    public function destroy($id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json(['message' => 'Tour not found'], 404);
        }

        $tour->delete();
        return response()->json(['message' => 'Tour deleted successfully']);
    }
}