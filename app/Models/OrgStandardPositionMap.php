<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgStandardPositionMap extends Model
{
    protected $table = 'org_standard_position_map';

    protected $primaryKey = 'org_standard_position_map_id';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'org_standard_position_map_id',
        'org_main_setup_header_id',
        'org_main_setup_detail_id',
        'org_position_id',
        'parent_org_position_id',
        'build_level',
        'build_column',
        'sort_order',
        'map_role',
        'effective_date',
        'active_yn',
        'record_created',
        'record_updated',
    ];

    protected $casts = [
        'build_level' => 'integer',
        'build_column' => 'integer',
        'sort_order' => 'integer',
        'active_yn' => 'boolean',
    ];
}
