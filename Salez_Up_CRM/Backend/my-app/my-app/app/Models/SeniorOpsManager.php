<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeniorOpsManager extends Model
{
    use HasFactory;

    protected $fillable = [
        'ops_manager_name',
        'commission',
        'email',
        'password',
        'ops_manager_secret_id'
    ];

    // protected $hidden = [
    //     'password'
    // ];
}

