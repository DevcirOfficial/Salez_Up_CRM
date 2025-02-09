<?php

// app/Models/JuniorDepartmentHead.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JuniorDepartmentHead extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'start_date',
        'image_path',
        'Dept_Head_id',
        'manager_id',
        'commission'
    ];

    // Relationship with Manager
    public function manager()
    {
        return $this->belongsTo(ManagerDetail::class);
    }

    public function deptHead()
    {
        return $this->belongsTo(DepartmentHead::class, 'Dept_Head_id');
    }
}
