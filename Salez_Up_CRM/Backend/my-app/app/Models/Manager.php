<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manager extends Model
{
    use HasFactory;

    protected $fillable = [
        'manager_name', 
        'commission', 
        'email', 
        'password', 
        'manager_secret_id',
    ];

    // protected $hidden = [
    //     'password', // Hide the password in responses
    // ];

    // Relation to SalesAgent Model (a Manager can have many SalesAgents)
    public function salesAgents()
    {
        return $this->hasMany(SalesAgent::class, 'manager_id');
    }


    public function teamLeaders()
    {
        return $this->hasMany(TeamLeader::class, 'manager_id');
    }

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }
}


