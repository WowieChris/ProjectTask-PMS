<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DistrictEngineer;
use App\Models\UserGroup;

class District extends Model
{
    protected $fillable = ['user_group_id', 'division_id', 'name', 'address'];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }
    public function areas()
    {
        return $this->hasMany(Area::class);
    }
    public function userGroup()
    {
        return $this->belongsTo(UserGroup::class);
    }
    public function engineer()
    {
        return $this->hasOne(DistrictEngineer::class, 'district_id');
    }
}
