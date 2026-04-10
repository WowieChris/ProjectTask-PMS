<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DivisionEngineer extends Model
{
    protected $table = 'user_group_engineers';

    protected $fillable = ['division_id', 'user_group_id', 'user_id'];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function userGroup()
    {
        return $this->belongsTo(UserGroup::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}