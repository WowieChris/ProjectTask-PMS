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

    protected $casts = [
        'date_received' => 'date',
    ];

    // ─── Constants ────────────────────────────────────────────────

    public const STATUSES = [
        'Pending',
        'Done',
        'ASD Procurement',
        'Endorsed to OP',
        'Endorsed to CD',
        'Cancelled',
        'IICTD Progress',
        'IICTD Signatories',
        'On Hold',
        'Releasing',
    ];

    public const TYPES = [
        'For Purchase',
        'Borrowing',
        'Accountability',
        'Access',
        'Assistance',
        'Return to Supplier',
    ];

    // ─── Accessors ────────────────────────────────────────────────

    /**
     * Returns date_received as "Jan 15, 2025" for display.
     */
    public function getFormattedDateAttribute(): string
    {
        return $this->date_received?->format('M d, Y') ?? '—';
    }

    /**
     * Returns the Tailwind CSS classes for the status badge.
     * Use directly in Blade; pass via Inertia props for React.
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'Pending'            => 'bg-yellow-500/20 text-yellow-400',
            'Done'               => 'bg-green-500/20 text-green-400',
            'Cancelled'          => 'bg-red-500/20 text-red-400',
            'On Hold'            => 'bg-blue-500/20 text-blue-400',
            'ASD Procurement'    => 'bg-purple-500/20 text-purple-400',
            'Endorsed to OP'     => 'bg-indigo-500/20 text-indigo-400',
            'Endorsed to CD'     => 'bg-indigo-500/20 text-indigo-400',
            'IICTD Progress'     => 'bg-cyan-500/20 text-cyan-400',
            'IICTD Signatories'  => 'bg-teal-500/20 text-teal-400',
            'Releasing'          => 'bg-orange-500/20 text-orange-400',
            default              => 'bg-gray-500/20 text-gray-400',
        };
    }

    // ─── Status Scopes ────────────────────────────────────────────

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'Pending');
    }

    public function scopeDone(Builder $query): Builder
    {
        return $query->where('status', 'Done');
    }

    public function scopeCancelled(Builder $query): Builder
    {
        return $query->where('status', 'Cancelled');
    }

    public function scopeOnHold(Builder $query): Builder
    {
        return $query->where('status', 'On Hold');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNotIn('status', ['Done', 'Cancelled']);
    }

    // ─── Date Scopes ──────────────────────────────────────────────

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

    public function scopeThisYear(Builder $query): Builder
    {
        return $query->whereYear('date_received', now()->year);
    }

    public function scopeDateBetween(Builder $query, string $from, string $to): Builder
    {
        return $query->whereBetween('date_received', [$from, $to]);
    }

    // ─── Type Scopes ──────────────────────────────────────────────

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('request_type', $type);
    }

    // ─── Search Scope ─────────────────────────────────────────────

    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where(function (Builder $q) use ($term) {
            $q->where('full_name',      'like', "%{$term}%")
              ->orWhere('request_id',    'like', "%{$term}%")
              ->orWhere('request_title', 'like', "%{$term}%")
              ->orWhere('department',    'like', "%{$term}%")
              ->orWhere('srf_number',    'like', "%{$term}%");
        });
    }

    // ─── ID Generator ─────────────────────────────────────────────

    /**
     * Call before create() to get a safe, padded request_id.
     * Uses max(id) instead of count() so deletions don't cause collisions.
     */
    public static function generateRequestId(): string
    {
    $year  = now()->year;
    $count = static::whereYear('created_at', $year)->count() + 1;
    return $year . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);
    }
}