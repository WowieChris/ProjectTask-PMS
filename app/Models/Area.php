<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Inertia\Inertia;

class Area extends Model
{
    protected $fillable = ['user_group_id', 'name'];

    public function userGroup(): BelongsTo
    {
        return $this->belongsTo(UserGroup::class);
    }

    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }
    public function index()
    {
        return Inertia::render('Areas/Index', [
            'userGroups' => UserGroup::all(),
            'selectedGroup' => null,
            'divisions' => [],
            'selectedDivision' => null,
            'districts' => [],
        ]);
    }
}
