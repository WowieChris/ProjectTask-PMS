<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ScheduledLocationMove extends Model
{
    protected $fillable = [
        'location_type', 'location_id', 'target_parent_id',
        'scheduled_at', 'status', 'scheduled_by',
        'applied_by', 'applied_at', 'notes',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'applied_at'   => 'datetime',
    ];

    public function scopeDue(Builder $query): Builder
    {
        return $query->where('status', 'pending')
                     ->where('scheduled_at', '<=', now());
    }
}