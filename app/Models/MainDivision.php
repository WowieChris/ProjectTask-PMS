<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainDivision extends Model
{
    protected $table = 'main_division';
    protected $primaryKey = 'main_division_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'main_division_id',
        'main_division_code',
        'main_division_name',
        'main_department_id',
        'description',
        'active_yn',
        'record_created',
        'record_updated',
    ];

    protected $casts = [
        'active_yn'      => 'boolean',
        'record_created' => 'datetime',
        'record_updated' => 'datetime',
    ];

    public function department()
    {
        return $this->belongsTo(MainDepartment::class, 'main_department_id', 'main_department_id');
    }

    public function sections()
    {
        return $this->hasMany(MainSection::class, 'main_division_id', 'main_division_id');
    }
}
