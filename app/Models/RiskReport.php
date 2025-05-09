<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_date',
        'risk_type',
        'description',
        'recommended_action',
    ];
}
