<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainTeam extends Model
{
    protected $table = 'main_team';
    protected $primaryKey = 'main_team_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    const CREATED_AT = 'record_created';
    const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'main_team_id',
        'main_team_code',
        'main_team_name',
        'main_section_id',
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

    public function section()
    {
        return $this->belongsTo(MainSection::class, 'main_section_id', 'main_section_id');
    }
}
