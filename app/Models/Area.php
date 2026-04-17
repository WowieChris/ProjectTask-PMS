<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Inertia\Inertia;

class Area extends Model
{
    protected $fillable = ['name', 'district_id', 'address'];

    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }

    public function division()
    {
        return $this->hasOneThrough(
            Division::class,
            District::class
        );
    }


    public function district()
    {
        return $this->belongsTo(District::class);
    }
}
