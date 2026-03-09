<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    // Update this line to include user_group_id
    protected $fillable = ['user_group_id', 'name', 'area_id'];

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    // public function districts()
    // {
    //     return $this->hasMany(District::class);
    // }

    public function userGroup()
    {
        return $this->belongsTo(\App\Models\UserGroup::class);
    }

    public function districts()
    {
        return $this->hasMany(District::class);
    }
}
