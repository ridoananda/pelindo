<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'respondent_name',
        'respondent_job',
        'risk_code',
        'risk_description',
        'severity',
        'occurrence',
        'detection',
    ];

    // Calculate RPN (Risk Priority Number)
    public function getRpnAttribute()
    {
        return $this->severity * $this->occurrence * $this->detection;
    }

    // Get risk level based on RPN
    public function getRiskLevelAttribute()
    {
        $rpn = $this->rpn;

        if ($rpn >= 125) {
            return 'Tinggi';
        } else {
            return 'Normal';
        }
    }

    // Static method to get analysis summary
    public static function getAnalysisSummary()
    {
        $assessments = self::all();
        $groupedByCode = $assessments->groupBy('risk_code');

        $summary = [];
        foreach ($groupedByCode as $code => $codeAssessments) {
            $avgSeverity = $codeAssessments->avg('severity');
            $avgOccurrence = $codeAssessments->avg('occurrence');
            $avgDetection = $codeAssessments->avg('detection');
            $avgRpn = $avgSeverity * $avgOccurrence * $avgDetection;

            $riskLevel = 'Normal';
            if ($avgRpn >= 125) {
                $riskLevel = 'Tinggi';
            }

            $summary[] = [
                'kode' => $code,
                'deskripsi' => $codeAssessments->first()->risk_description,
                'avg_severity' => round($avgSeverity, 4),
                'avg_occurrence' => round($avgOccurrence, 4),
                'avg_detection' => round($avgDetection, 4),
                'avg_rpn' => round($avgRpn, 8),
                'tingkat_risiko' => $riskLevel
            ];
        }

        // Sort by kode ascending (M01, M02, M03, etc.)
        usort($summary, function($a, $b) {
            // Extract numeric part from kode (e.g., M01 -> 1, M02 -> 2)
            $numA = (int) substr($a['kode'], 1);
            $numB = (int) substr($b['kode'], 1);
            return $numA <=> $numB;
        });

        return $summary;
    }
}
