<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
        'name',
        'area_id',
        'district_id',
        'division_id',
        'address',
        'longitude',
        'latitude',
        'geocode_status',
        'geocoded_at',
        
    ];

    public function area()
    {
        return $this->belongsTo(Area::class);
    }
    public function district()
    {
        return $this->belongsTo(District::class);
    }
    public function division()
    {
        return $this->belongsTo(Division::class);
    }
}
