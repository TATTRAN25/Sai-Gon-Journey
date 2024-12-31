<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'address', 'price_per_night', 'image',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function rooms()
    {
        return $this->hasMany(HotelRoom::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
