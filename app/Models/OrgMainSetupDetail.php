<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgMainSetupDetail extends Model
{
    protected $table = 'org_main_setup_detail';

    protected $primaryKey = 'org_main_setup_detail_id';

    public $incrementing = false;

    protected $keyType = 'string';

    const CREATED_AT = 'record_created';

    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'org_main_setup_detail_id',
        'org_main_setup_header_id',
        'org_main_setup_build_level',
        'org_main_setup_build_order',
        'org_main_setup_parent_level',
        'org_main_setup_parent_id',
        'org_main_setup_child_level',
        'org_main_setup_child_id',
        'effective_date',
    ];

    protected $casts = [
        'org_main_setup_build_level' => 'integer',
        'org_main_setup_build_order' => 'integer',
        'effective_date' => 'date',
        'record_created' => 'datetime',
        'record_updated' => 'datetime',
    ];
}
