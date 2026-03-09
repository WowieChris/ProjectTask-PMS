<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Inertia\Inertia;

class Area extends Model
{
    protected $fillable = ['name', 'district_id'];

    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }
    public function index()
    {
        return Inertia::render('Areas/Index', [
            'divisions' => [],
            'selectedDivision' => null,
            'districts' => [],
        ]);
    }
    public function district()
    {
        return $this->belongsTo(District::class);
    }
}
