<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\TourSchedule;

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
            return response()->json(['message' => 'Không tìm thấy Tour'], 404);
        }
        return response()->json($tour);
    }

    // Thêm mới tour
    public function store(Request $request)
    {
        try {
            // Validate dữ liệu đầu vào
            $request->validate([
                'name' => 'required|string|max:25|regex:/^[a-zA-Z \p{L}]+$/u',
                'description' => 'required|string|max:255',
                'price' => 'required|numeric|max:1000000000',
                'start_date' => 'required|date|after_or_equal:today',
                'end_date' => 'required|date|after:start_date',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Xử lý file ảnh (nếu có)
            $imagePath = null;
            if ($request->hasFile('image')) {
                // Lưu file ảnh vào thư mục `storage/app/public/tours`
                $imagePath = $request->file('image')->store('tours', 'public');
            }

            // Tạo tour mới
            $tour = Tour::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'image' => $imagePath, // Lưu đường dẫn file ảnh
            ]);

            // Trả về thông tin tour vừa tạo
            return response()->json($tour, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi thêm mới tour', 'error' => $e->getMessage()], 500);
        }
    }

    // Cập nhật thông tin tour
    public function update(Request $request, $id)
    {
        // Tìm tour theo ID
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json(['message' => 'Không tìm thấy Tour'], 404);
        }

        try {
            // Validate dữ liệu đầu vào
            $request->validate([
                'name' => 'nullable|string|max:25|regex:/^[a-zA-Z \p{L}]+$/u',
                'description' => 'nullable|string|max:255',
                'price' => 'nullable|numeric|max:1000000000',
                'start_date' => 'nullable|date|after_or_equal:today',
                'end_date' => 'nullable|date|after:start_date',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Xử lý file ảnh (nếu có)
            if ($request->hasFile('image')) {
                // Xóa ảnh cũ (nếu có)
                if ($tour->image) {
                    Storage::disk('public')->delete($tour->image);
                }

                // Lưu ảnh mới vào thư mục `storage/app/public/tours`
                $imagePath = $request->file('image')->store('tours', 'public');
                $tour->image = $imagePath;
            }

            // Cập nhật thông tin tour
            $tour->update([
                'name' => $request->name ?? $tour->name,
                'description' => $request->description ?? $tour->description,
                'price' => $request->price ?? $tour->price,
                'start_date' => $request->start_date ?? $tour->start_date,
                'end_date' => $request->end_date ?? $tour->end_date,
                'image' => $imagePath ?? $tour->image,
            ]);

            // Trả về thông tin tour đã cập nhật
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
            return response()->json(['message' => 'Không tìm thấy Tour'], 404);
        }

        // Xóa ảnh cũ
        if ($tour->image) {
            Storage::disk('public')->delete($tour->image);
        }

        // Xóa tour
        $tour->delete();

        return response()->json(['message' => 'Xóa Tour thành công']);
    }

    // Lấy danh sách lịch trình của một tour
    public function getSchedules($tourId)
    {
        $tour = Tour::find($tourId);
        if (!$tour) {
            return response()->json(['message' => 'Tour không tồn tại'], 404);
        }

        $schedules = $tour->schedules;
        return response()->json($schedules);
    }

    // Thêm mới lịch trình cho tour
    public function addSchedule(Request $request, $tourId)
    {
        $tour = Tour::find($tourId);
        if (!$tour) {
            return response()->json(['message' => 'Tour không tồn tại'], 404);
        }

        try {
            $request->validate([
                'schedule_date' => 'required|date',
                'description' => 'required|string|max:255',
            ]);

            $schedule = $tour->schedules()->create($request->all());
            return response()->json($schedule, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi thêm mới lịch trình', 'error' => $e->getMessage()], 500);
        }
    }

    // Cập nhật thông tin lịch trình
    public function updateSchedule(Request $request, $tourId, $scheduleId)
    {
        $tour = Tour::find($tourId);
        if (!$tour) {
            return response()->json(['message' => 'Tour không tồn tại'], 404);
        }

        $schedule = TourSchedule::where('tour_id', $tourId)->find($scheduleId);
        if (!$schedule) {
            return response()->json(['message' => 'Lịch trình không tồn tại'], 404);
        }

        try {
            $request->validate([
                'schedule_date' => 'nullable|date',
                'description' => 'nullable|string|max:255',
            ]);

            $schedule->update($request->all());
            return response()->json($schedule);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi cập nhật lịch trình', 'error' => $e->getMessage()], 500);
        }
    }

    // Xóa lịch trình
    public function deleteSchedule($tourId, $scheduleId)
    {
        $tour = Tour::find($tourId);
        if (!$tour) {
            return response()->json(['message' => 'Tour không tồn tại'], 404);
        }

        $schedule = TourSchedule::where('tour_id', $tourId)->find($scheduleId);
        if (!$schedule) {
            return response()->json(['message' => 'Lịch trình không tồn tại'], 404);
        }

        $schedule->delete();
        return response()->json(['message' => 'Lịch trình đã được xóa thành công']);
    }
}
