<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FieldDistrict extends Model
{
    protected $table = 'field_district';
    protected $primaryKey = 'field_district_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'field_district_id',
        'field_district_code',
        'field_district_name',
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

    public function division()
    {
        return $this->belongsTo(FieldDivision::class, 'field_division_id', 'field_division_id');
    }

    public function areas()
    {
        return $this->hasMany(FieldArea::class, 'field_district_id', 'field_district_id');
    }
}
