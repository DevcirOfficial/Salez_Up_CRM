<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeadOfSales extends Model
{
    use HasFactory;

    protected $fillable = [
        'head_of_sales_name', 
        'commission', 
        'email', 
        'password', 
        'head_of_sales_secret_id'
    ];


    // public function setPasswordAttribute($value)
    // {
    //     $this->attributes['password'] = bcrypt($value);
    // }
}
