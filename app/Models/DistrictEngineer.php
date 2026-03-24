<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DistrictEngineer extends Model
{
    protected $fillable = [
        'district_id',
        'user_id',
    ];

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
