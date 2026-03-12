<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Filesystem\Filesystem; // 👈 add this

class UserPhoto extends Model
{
    protected $fillable = [
        'user_id',
        'disk',
        'path',
        'original_name',
        'size',
        'mime_type',
        'is_current',
    ];

    protected $casts = [
        'is_current' => 'boolean',
    ];

    protected $appends = ['url'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getUrlAttribute(): string
    {
        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk($this->disk);

        return $disk->url($this->path);
    }
}
