<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AreaEngineer extends Model
{
    protected $fillable = [
        'area_id',
        'user_id',
    ];

    public function area()
    {
        return $this->belongsTo(Area::class);
    }
    //Test
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
