<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgFunctionArea extends Model
{
    protected $table = 'org_function_areas';

    protected $primaryKey = 'function_area_id';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;

    const CREATED_AT = 'record_created';

    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'function_area_id',
        'department_id',
        'area_name',
        'sort_order',
        'active_yn',
        'record_created',
        'record_updated',
    ];

    public function sections()
    {
        return $this->hasMany(OrgFunctionSection::class, 'function_area_id', 'function_area_id')
            ->where('active_yn', 1)
            ->orderBy('sort_order');
    }
}
