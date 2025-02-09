<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KpiInfo extends Model
{
    use HasFactory;

    protected $table = 'kpi_info';

    protected $fillable = ['kpi_name'];
}
