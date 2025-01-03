<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\HotelRoom;

class HotelController extends Controller
{
    // Lấy danh sách tất cả khách sạn
    public function index()
    {
        $hotels = Hotel::all();
        return response()->json($hotels);
    }

    // Lấy thông tin chi tiết của một khách sạn
    public function show($id)
    {
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
        }
        return response()->json($hotel);
    }

    // Thêm mới khách sạn
    public function store(Request $request)
    {
        try {
            // Validate dữ liệu đầu vào
            $request->validate([
                'name' => 'required|string|max:25|regex:/^[a-zA-Z \p{L}]+$/u',
                'address' => 'required|string|max:100',
                'price_per_night' => 'required|numeric|max:1000000000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Xử lý file ảnh
            $imagePath = null;
            if ($request->hasFile('image')) {
                // Lưu file ảnh vào thư mục `storage/app/public/hotels`
                $imagePath = $request->file('image')->store('hotels', 'public');
            }

            // Tạo khách sạn mới
            $hotel = Hotel::create([
                'name' => $request->name,
                'address' => $request->address,
                'price_per_night' => $request->price_per_night,
                'image' => $imagePath,
            ]);

            // Trả về thông tin khách sạn vừa tạo
            return response()->json($hotel, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi thêm mới khách sạn', 'error' => $e->getMessage()], 500);
        }
    }

    // Cập nhật thông tin khách sạn
    public function update(Request $request, $id)
    {
        // Tìm khách sạn theo ID
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
        }

        // Validate dữ liệu đầu vào
        $request->validate([
            'name' => 'nullable|string|max:25|regex:/^[a-zA-Z \p{L}]+$/u',
            'address' => 'nullable|string|max:100',
            'price_per_night' => 'nullable|numeric|max:1000000000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Xử lý file ảnh (nếu có)
        if ($request->hasFile('image')) {
            // Xóa ảnh cũ (nếu có)
            if ($hotel->image) {
                Storage::disk('public')->delete($hotel->image);
            }

            // Lưu ảnh mới vào thư mục `storage/app/public/hotels`
            $imagePath = $request->file('image')->store('hotels', 'public');
            $hotel->image = $imagePath;
        }

        // Cập nhật thông tin khách sạn
        $hotel->update([
            'name' => $request->name ?? $hotel->name,
            'address' => $request->address ?? $hotel->address,
            'price_per_night' => $request->price_per_night ?? $hotel->price_per_night,
            'image' => $imagePath ?? $hotel->image,
        ]);

        // Trả về thông tin khách sạn đã cập nhật
        return response()->json($hotel);
    }

    // Xóa khách sạn
    public function destroy($id)
    {
        // Tìm khách sạn theo ID
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
        }

        // Xóa ảnh cũ (nếu có)
        if ($hotel->image) {
            Storage::disk('public')->delete($hotel->image);
        }

        // Xóa khách sạn
        $hotel->delete();

        // Trả về thông báo thành công
        return response()->json(['message' => 'Khách sạn đã được xóa thành công']);
    }

    // Lấy danh sách các phòng của một khách sạn
    public function getRooms($hotelId)
    {
        $hotel = Hotel::find($hotelId);
        if (!$hotel) {
            return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
        }

        $rooms = $hotel->rooms;
        return response()->json($rooms);
    }

    // Thêm mới phòng cho khách sạn
    public function addRoom(Request $request, $hotelId)
    {
        $hotel = Hotel::find($hotelId);
        if (!$hotel) {
            return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
        }

        try {
            $request->validate([
                'room_type' => 'required|string|max:50',
                'price' => 'required|numeric|min:0|max:1000000000',
                'capacity' => 'required|integer|min:1|max:10',
            ]);

            $room = $hotel->rooms()->create($request->all());
            return response()->json($room, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi thêm mới phòng', 'error' => $e->getMessage()], 500);
        }
    }

    // Cập nhật thông tin phòng
    public function updateRoom(Request $request, $hotelId, $roomId)
    {
        $hotel = Hotel::find($hotelId);
        if (!$hotel) {
            return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
        }

        $room = HotelRoom::where('hotel_id', $hotelId)->find($roomId);
        if (!$room) {
            return response()->json(['message' => 'Phòng không tồn tại'], 404);
        }

        try {
            $request->validate([
                'room_type' => 'nullable|string|max:50',
                'price' => 'nullable|numeric|min:0|max:1000000000',
                'capacity' => 'nullable|integer|min:1|max:50',
            ]);
            
            $room->update($request->all());
            return response()->json($room);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi cập nhật phòng', 'error' => $e->getMessage()], 500);
        }
    }

    // Xóa phòng
    public function deleteRoom($hotelId, $roomId)
    {
        try {
            $hotel = Hotel::find($hotelId);
            if (!$hotel) {
                return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
            }

            $room = HotelRoom::where('hotel_id', $hotelId)->find($roomId);
            if (!$room) {
                return response()->json(['message' => 'Phòng không tồn tại'], 404);
            }

            $room->delete();
            return response()->json(['message' => 'Phòng đã được xóa thành công']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi xóa phòng', 'error' => $e->getMessage()], 500);
        }
    }
}
