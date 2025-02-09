<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = ['team_name', 'start_date', "manager_id"];

    // Relation to SalesAgent Model (a Team can have many SalesAgents)
    public function salesAgents()
    {
        return $this->hasMany(SalesAgent::class, 'team_id');
    }
}
