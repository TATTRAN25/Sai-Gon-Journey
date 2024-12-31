<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'price', 'start_date', 'end_date', 'image',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function schedules()
    {
        return $this->hasMany(TourSchedule::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
