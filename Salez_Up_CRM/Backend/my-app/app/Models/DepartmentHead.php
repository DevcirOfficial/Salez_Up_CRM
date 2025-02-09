<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartmentHead extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name', 
        'last_name', 
        'email', 
        'password', 
        'start_date', 
        'image_path', 
        'manager_id', 
        'commission'
    ];

    // Define the relationship to the manager
    public function manager()
    {
        return $this->belongsTo(ManagerDetail::class, 'manager_id');
    }
}
