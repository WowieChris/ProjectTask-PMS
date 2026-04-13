<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class EARequest extends Model
{
    protected $table = 'ea_requests';

    protected $fillable = [
        'request_id', 'full_name', 'department',
        'request_title', 'item_requested',
        'date_received', 'srf_number',
        'status', 'request_type',
    ];

    /* START: Status scope helpers */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'Pending');
    }

    public function scopeDone(Builder $query): Builder
    {
        return $query->where('status', 'Done');
    }

    public function scopeThisMonth(Builder $query): Builder
    {
        return $query->whereMonth('date_received', now()->month)
                     ->whereYear('date_received',  now()->year);
    }

    public function scopeLastMonth(Builder $query): Builder
    {
        $last = now()->subMonth();
        return $query->whereMonth('date_received', $last->month)
                     ->whereYear('date_received',  $last->year);
    }
    /* END: Status scope helpers */
}