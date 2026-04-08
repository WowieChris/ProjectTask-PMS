<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationTransferLog extends Model
{
    protected $fillable = [
        'type',
        'location_id',
        'from_parent_id',
        'to_parent_id',
        'location_name',
        'effectivity_date',
        'moved_by',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'moved_by');
    }
}
