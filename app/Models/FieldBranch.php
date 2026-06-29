<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FieldBranch extends Model
{
    protected $table      = 'field_branch';
    protected $primaryKey = 'field_branch_id';
    protected $keyType    = 'string';
    public    $incrementing = false;

    protected $fillable = [
        'field_branch_id',
        'field_branch_code',
        'field_branch_name',
        'field_area_id',
        'address',
        'description',
        'latitude',
        'longitude',
        'active_yn',
    ];

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';
}