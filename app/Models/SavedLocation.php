<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedLocation extends Model
{
    protected $fillable = ['label', 'lat', 'lng', 'user_id'];
}
