<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FieldDivision extends Model
{
    protected $table = 'field_division';
    protected $primaryKey = 'field_division_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'field_division_id',
        'field_division_code',
        'field_division_name',
        'description',
        'active_yn',
        'record_created',
        'record_updated',
        'latitude',
        'longitude',
        'address',
    ];

    protected $casts = [
        'active_yn'      => 'boolean',
        'record_created' => 'datetime',
        'record_updated' => 'datetime',
    ];

    public function districts()
    {
        return $this->hasMany(FieldDistrict::class, 'field_division_id', 'field_division_id');
    }
}
