<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FieldArea extends Model
{
    protected $table = 'field_area';
    protected $primaryKey = 'field_area_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'field_area_id',
        'field_area_code',
        'field_area_name',
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

    public function district()
    {
        return $this->belongsTo(FieldDistrict::class, 'field_district_id', 'field_district_id');
    }

    public function branches()
    {
        return $this->hasMany(FieldBranch::class, 'field_area_id', 'field_area_id');
    }
}
