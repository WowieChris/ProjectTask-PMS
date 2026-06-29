<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgPosition extends Model
{
    protected $table = 'org_position';

    protected $primaryKey = 'org_position_id';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;

    const CREATED_AT = 'record_created';

    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'org_position_id',
        'position_title',
        'designation_id',
        'designation_type_id',
        'parent_position_id',
        'department_id',
        'org_segment',
        'org_level_name',
        'org_level_id',
        'section_key',
        'function_group_id',
        'position_type',
        'level_no',
        'employee_id',
        'sort_order',
        'active_yn',
        'locked_yn',
        'record_created',
        'record_updated',
    ];

    protected $casts = [
        'active_yn' => 'boolean',
        'locked_yn' => 'boolean',
        'level_no' => 'integer',
        'sort_order' => 'integer',
        'record_created' => 'datetime',
        'record_updated' => 'datetime',
    ];

    public function parent()
    {
        return $this->belongsTo(OrgPosition::class, 'parent_position_id', 'org_position_id');
    }

    public function children()
    {
        return $this->hasMany(OrgPosition::class, 'parent_position_id', 'org_position_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'employee_id');
    }

    public function assignments()
    {
        return $this->hasMany(EmployeePositionAssignment::class, 'org_position_id', 'org_position_id');
    }

    public function activeAssignment()
    {
        return $this->hasOne(EmployeePositionAssignment::class, 'org_position_id', 'org_position_id')
            ->where('active_yn', 1);
    }

    public function department()
    {
        return $this->belongsTo(MainDepartment::class, 'department_id', 'main_department_id');
    }
}
