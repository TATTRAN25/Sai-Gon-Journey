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
        try {
            $request->validate([
                'name' => 'required|string|max:25|regex:/^[a-zA-Z \p{L}]+$/u',
                'description' => 'required|string|max:255',
                'price' => 'required|numeric|max:1000000000',
                'start_date' => 'required|date|after_or_equal:today',
                'end_date' => 'required|date',
                'image' => 'nullable|string|in:storage/app/public/tours',
            ]);

            $tour = Tour::create($request->all());
            return response()->json($tour, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate', 'errors' => $e->errors()], 422);
        }
    }

    // Cập nhật thông tin tour
    public function update(Request $request, $id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json(['message' => 'Tour not found'], 404);
        }

        try {
            $request->validate([
                'name' => 'nullable|string|max:25|regex:/^[a-zA-Z \p{L}]+$/u',
                'description' => 'nullable|string|max:255',
                'price' => 'nullable|numeric|max:1000000000',
                'start_date' => 'nullable|date|after_or_equal:today',
                'end_date' => 'nullable|date',
                'image' => 'nullable|string|in:storage/app/public/tours',
            ]);

            $tour->update($request->all());
            return response()->json($tour);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi cập nhật tour', 'error' => $e->getMessage()], 500);
        }
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