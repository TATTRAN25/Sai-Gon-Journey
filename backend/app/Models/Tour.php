<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tour extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'start_date',
        'end_date',
        'image'
    ];

    protected $cast = [
        'price' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function scopeActive($query) {
        return $query->where('start_date', '<=', now())
                    ->where('end_date', '=>', now());
    }

    public function getFormattedPriceAttribute() {
        return '$' . number_format($this->price, 2);
    }
}
