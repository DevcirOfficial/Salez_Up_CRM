<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignsAndTeams extends Model
{
    use HasFactory;

    protected $table = 'campaigns_and_teams';

    // Include the new fields in the fillable array
    protected $fillable = ['team_id', 'campaign_id', 'department_head_id', 'junior_department_head_id'];

    // Define relationship to the Team model
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function teamAndTeamLeader()
    {
        return $this->belongsTo(TeamAndTeamLeader::class, 'team_id');
    }

    // Define relationship to the Campaign model
    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    // Define relationship to the DepartmentHead model
    public function departmentHead()
    {
        return $this->belongsTo(DepartmentHead::class, 'department_head_id');
    }

    // Define relationship to the JuniorDepartmentHead model
    public function juniorDepartmentHead()
    {
        return $this->belongsTo(JuniorDepartmentHead::class, 'junior_department_head_id');
    }
}
