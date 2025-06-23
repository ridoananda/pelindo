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

        if ($rpn >= 150) {
            return 'Tinggi';
        } elseif ($rpn >= 100) {
            return 'Sedang';
        } else {
            return 'Rendah';
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

            $riskLevel = 'Rendah';
            if ($avgRpn >= 150) {
                $riskLevel = 'Tinggi';
            } elseif ($avgRpn >= 100) {
                $riskLevel = 'Sedang';
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

        // Sort by RPN descending
        usort($summary, function($a, $b) {
            return $b['avg_rpn'] <=> $a['avg_rpn'];
        });

        return $summary;
    }
}
