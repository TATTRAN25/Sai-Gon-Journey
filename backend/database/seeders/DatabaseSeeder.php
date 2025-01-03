<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tour;
use App\Models\Hotel;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Review;
use App\Models\TourSchedule;
use App\Models\HotelRoom;
use App\Models\Notification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Tạo dữ liệu mẫu cho bảng users
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => '123456',
            'role' => 'admin',
        ]);

        $user = User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => '123456',
            'role' => 'user',
        ]);

        // Tạo dữ liệu mẫu cho bảng tours
        $tour = Tour::create([
            'name' => 'Tour Đà Nẵng',
            'description' => 'Khám phá Đà Nẵng trong 3 ngày 2 đêm.',
            'price' => 1500000,
            'start_date' => '2023-12-01',
            'end_date' => '2023-12-03',
            'image' => 'tour_da_nang.jpg',
        ]);

        // Tạo dữ liệu mẫu cho bảng hotels
        $hotel = Hotel::create([
            'name' => 'Khách sạn Biển Đông',
            'address' => '123 Đường Biển, Đà Nẵng',
            'price_per_night' => 500000,
            'image' => 'hotel_bien_dong.jpg',
        ]);

        // Tạo dữ liệu mẫu cho bảng hotel_rooms
        $hotelRoom = HotelRoom::create([
            'hotel_id' => $hotel->id,
            'room_type' => 'Phòng đôi',
            'price' => 500000,
            'capacity' => 2,
        ]);

        // Tạo dữ liệu mẫu cho bảng bookings
        $booking = Booking::create([
            'user_id' => $user->id,
            'tour_id' => $tour->id,
            'hotel_id' => $hotel->id,
            'booking_date' => '2023-11-15',
            'status' => 'confirmed',
        ]);

        // Tạo dữ liệu mẫu cho bảng payments
        $payment = Payment::create([
            'booking_id' => $booking->id,
            'amount' => 1500000,
            'payment_date' => '2023-11-15',
            'status' => 'completed',
        ]);

        // Tạo dữ liệu mẫu cho bảng reviews
        $review = Review::create([
            'user_id' => $user->id,
            'tour_id' => $tour->id,
            'comment' => 'Tour rất tuyệt vời!',
            'rating' => 5,
        ]);

        // Tạo dữ liệu mẫu cho bảng tour_schedules
        $tourSchedule = TourSchedule::create([
            'tour_id' => $tour->id,
            'schedule_date' => '2023-12-01',
            'description' => 'Tham quan Cầu Rồng và Bãi biển Mỹ Khê.',
        ]);

        // Tạo dữ liệu mẫu cho bảng notifications
        $notification = Notification::create([
            'user_id' => $user->id,
            'message' => 'Đặt tour thành công!',
            'is_read' => false,
        ]);
    }
}