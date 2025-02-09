<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'food_image', 
        'status'
    ];

    // Explicitly define the table name if necessary
    protected $table = 'foods';
}

