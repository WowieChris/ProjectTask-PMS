<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainDepartment extends Model
{
    protected $table = 'main_department';
    protected $primaryKey = 'main_department_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'main_department_id',
        'main_department_code',
        'main_department_name',
        'main_segment_id',
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

    public function segment()
    {
        return $this->belongsTo(MainSegment::class, 'main_segment_id', 'main_segment_id');
    }

    public function divisions()
    {
        return $this->hasMany(MainDivision::class, 'main_department_id', 'main_department_id');
    }
}
