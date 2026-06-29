<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgMainSetupHeader extends Model
{
    protected $table = 'org_main_setup_header';

    protected $primaryKey = 'org_main_setup_header_id';

    public $incrementing = false;

    protected $keyType = 'string';

    const CREATED_AT = 'record_created';

    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'org_main_setup_header_id',
        'org_main_segment_id',
        'org_main_department_id',
        'effective_date',
    ];

    protected $casts = [
        'effective_date' => 'date',
        'record_created' => 'datetime',
        'record_updated' => 'datetime',
    ];
}
