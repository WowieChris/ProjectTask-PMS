<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgFunctionSection extends Model
{
    protected $table = 'org_function_sections';

    protected $primaryKey = 'function_section_id';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;

    const CREATED_AT = 'record_created';

    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'function_section_id',
        'function_area_id',
        'section_name',
        'sort_order',
        'active_yn',
        'record_created',
        'record_updated',
    ];

    public function area()
    {
        return $this->belongsTo(OrgFunctionArea::class, 'function_area_id', 'function_area_id');
    }

    public function groups()
    {
        return $this->hasMany(OrgFunctionGroup::class, 'function_section_id', 'function_section_id')
            ->where('active_yn', 1)
            ->orderBy('sort_order');
    }
}
