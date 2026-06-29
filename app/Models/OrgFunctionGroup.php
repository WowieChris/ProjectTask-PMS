<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgFunctionGroup extends Model
{
    protected $table = 'org_function_groups';

    protected $primaryKey = 'function_group_id';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;

    const CREATED_AT = 'record_created';

    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'function_group_id',
        'function_section_id',
        'group_name',
        'sort_order',
        'active_yn',
        'record_created',
        'record_updated',
    ];

    public function section()
    {
        return $this->belongsTo(OrgFunctionSection::class, 'function_section_id', 'function_section_id');
    }
}
