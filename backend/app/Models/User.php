<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Quan hệ với bảng bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    // Quan hệ với bảng reviews
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Quan hệ với bảng notifications
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
