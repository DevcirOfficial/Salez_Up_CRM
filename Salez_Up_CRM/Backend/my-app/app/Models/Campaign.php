<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = ['campaign_name', 'start_date', 'end_date', 'manager_id', 'image_path'];

    /**
     * Define the relationship with the Manager model.
     */
    public function manager()
    {
        return $this->belongsTo(ManagerDetail::class, 'manager_id');
    }
}
