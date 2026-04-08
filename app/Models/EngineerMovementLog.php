<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngineerMovementLog extends Model
{
    protected $fillable = [
        'area_name',
        'previous_engineer',
        'new_engineer',
        'assigned_by',
        'effectivity_date'
    ];
}
