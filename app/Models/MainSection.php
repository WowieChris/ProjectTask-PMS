<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainSection extends Model
{
    protected $table = 'main_section';
    protected $primaryKey = 'main_section_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'main_section_id',
        'main_section_code',
        'main_section_name',
        'main_division_id',
        'description',
        'active_yn',
        'record_created',
        'record_updated',
    ];

    protected $casts = [
        'active_yn'      => 'boolean',
        'record_created' => 'datetime',
        'record_updated' => 'datetime',
    ];

    public function division()
    {
        return $this->belongsTo(MainDivision::class, 'main_division_id', 'main_division_id');
    }

    public function teams()
    {
        return $this->hasMany(MainTeam::class, 'main_section_id', 'main_section_id');
    }
}
