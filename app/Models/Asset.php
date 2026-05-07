<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    public function category()
    {
        return $this->belongsTo(AssetCategory::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function assignments()
    {
        return $this->hasMany(AssetAssignment::class);
    }

    public function transfers()
    {
        return $this->hasMany(AssetTransfer::class);
    }
}
