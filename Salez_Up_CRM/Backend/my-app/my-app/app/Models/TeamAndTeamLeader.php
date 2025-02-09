<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamAndTeamLeader extends Model
{
    use HasFactory;

    protected $table = 'team_and_team_leader';

    protected $fillable = [
        'team_id',
        'team_leader_id',
        'kpi_data'
    ];

    // Binding logic for Team
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    // Binding logic for Team Leader
    public function teamLeader()
    {
        return $this->belongsTo(TeamLeader::class);
    }
}
