<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'manager_name',
        'Admin_Id',
        'manager_image_path',
        'manager_commision',
        'manager_email',
        'manager_password',
        'manager_secret_id',
        'senior_ops_manager_id',
        'head_of_sales_id',
        'manager_role' 
    
    ];

    public function headOfSales()
    {
        return $this->belongsTo(ManagerDetail::class, 'head_of_sales_id');
    }

    public function admin()
    {
        return $this->belongsTo(AdminPortalData::class, 'Admin_Id');
    }

    public function seniorOpsManager()
    {
        return $this->belongsTo(ManagerDetail::class, 'senior_ops_manager_id');
    }

  
}
