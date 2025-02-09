<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaderKpi extends Model
{
    use HasFactory;

    protected $table = 'leader_kpi';

    protected $fillable = [
        'team_id',
        'team_leader_id',
        'kpi_data',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function teamLeader()
    {
        return $this->belongsTo(TeamLeader::class);
    }
}