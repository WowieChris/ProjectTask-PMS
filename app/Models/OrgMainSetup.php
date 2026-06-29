<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgMainSetup extends Model
{
    protected $table = 'org_main_setup';
    protected $primaryKey = 'org_main_setup_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'org_main_setup_id',
        'org_main_segment_id',
        'org_main_department_id',
        'org_main_division_id',
        'org_main_section_id',
        'org_main_team_id',
        'effective_date',
        'record_created',
        'record_updated',
        'main_division_id',
    ];

    protected $casts = [
        'effective_date' => 'date',
        'record_created' => 'datetime',
        'record_updated' => 'datetime',
    ];

    // Relationships
    public function segment()
    {
        return $this->belongsTo(MainSegment::class, 'org_main_segment_id', 'main_segment_id');
    }

    public function department()
    {
        return $this->belongsTo(MainDepartment::class, 'org_main_department_id', 'main_department_id');
    }

    public function division()
    {
        return $this->belongsTo(MainDivision::class, 'org_main_division_id', 'main_division_id');
    }

    public function section()
    {
        return $this->belongsTo(MainSection::class, 'org_main_section_id', 'main_section_id');
    }

    public function team()
    {
        return $this->belongsTo(MainTeam::class, 'org_main_team_id', 'main_team_id');
    }
}
