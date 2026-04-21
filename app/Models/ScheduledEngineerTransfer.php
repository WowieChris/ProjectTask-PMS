<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScheduledEngineerTransfer extends Model
{
    protected $fillable = [
        'engineer_id',
        'district_id',
        'area_id',
        'scheduled_at',
        'status',
        'scheduled_by',
        'notes',
        'applied_at',
        'applied_by',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'applied_at'   => 'datetime',
    ];

    // ── Relationships ──────────────────────────────────────────────

    public function engineer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'engineer_id');
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    // ── Scopes ─────────────────────────────────────────────────────

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeDue($query)
    {
        return $query->pending()->where('scheduled_at', '<=', now());
    }
}
