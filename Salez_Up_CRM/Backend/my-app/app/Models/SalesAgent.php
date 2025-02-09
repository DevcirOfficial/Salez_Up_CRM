<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesAgent extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_id',    
        'first_name',
        'last_name',
        'start_date',
        'email',
        'password',
        'manager_id',
        'kpi_data',
        'image_path'   
    ];

    // Relation to Team Model (each SalesAgent belongs to one Team)
    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }

    // Relation to Manager Model (each SalesAgent belongs to one Manager)
    public function manager()
    {
        return $this->belongsTo(Manager::class, 'manager_id');
    }
}
