<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminPortalData extends Model
{
    use HasFactory;

    protected $table = 'admin_portal_data';

    protected $fillable = [
        'admin_username',
        'admin_email',
        'admin_password',
    ];


}
