<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserGroup extends Model
{
    protected $fillable = ['name'];

    public function areas(): HasMany
    {
        return $this->hasMany(\App\Models\Area::class);
    }

    public function divisions()
    {
        return $this->hasMany(\App\Models\Division::class);
    }
}
