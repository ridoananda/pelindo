<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ship extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'cargo',
        'departure_time',
        'arrival_time',
        'status',
    ];
}
