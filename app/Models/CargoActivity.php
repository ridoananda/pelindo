<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CargoActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'ship_name',
        'type',
        'cargo_type',
        'quantity',
        'unit',
        'operator',
        'time',
        'status',
        'notes',
    ];
}
