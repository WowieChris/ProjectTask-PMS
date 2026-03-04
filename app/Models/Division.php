<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $fillable = ['area_id', 'name'];

    public function area()
{
    return $this->belongsTo(Area::class);
}

public function districts()
{
    return $this->hasMany(District::class);
}
}