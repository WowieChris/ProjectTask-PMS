<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgFieldSetup extends Model
{
    protected $table = 'org_field_setup';
    protected $primaryKey = 'org_field_setup_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'org_field_setup_id',
        'org_field_division_id',
        'org_field_district_id',
        'org_field_area_id',
        'org_field_branch_id',
        'effective_date',
        'record_created',
        'record_updated',
    ];

    protected $casts = [
        'effective_date' => 'date',
        'record_created' => 'datetime',
        'record_updated' => 'datetime',
    ];

    // Relationships
    public function division()
    {
        return $this->belongsTo(FieldDivision::class, 'org_field_division_id', 'field_division_id');
    }

    public function district()
    {
        return $this->belongsTo(FieldDistrict::class, 'org_field_district_id', 'field_district_id');
    }

    public function area()
    {
        return $this->belongsTo(FieldArea::class, 'org_field_area_id', 'field_area_id');
    }

    public function branch()
    {
        return $this->belongsTo(FieldBranch::class, 'org_field_branch_id', 'field_branch_id');
    }
}
