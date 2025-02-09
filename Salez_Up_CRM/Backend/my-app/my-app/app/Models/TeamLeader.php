<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamLeader extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'start_date',
        'email',
        'password',
        'manager_id',
        'kpi_data',
        'image_path'
    ];

    // Relation to Manager Model (a TeamLeader belongs to one Manager)
    public function manager()
    {
        return $this->belongsTo(ManagerDetail::class, 'manager_id');
    }

    public function kpi_data(){
        return $this->belongsTo(LeaderKpi::class, 'kpi_data');
    }

    public function teamAndTeamLeaders()
    {
        return $this->hasMany(TeamAndTeamLeader::class, 'team_leader_id');
    }
}
