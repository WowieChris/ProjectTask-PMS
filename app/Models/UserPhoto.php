<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'disk',
        'path',
        'original_name',
        'size',
        'mime_type',
        'is_current',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}