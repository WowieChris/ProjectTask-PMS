<?php

namespace App\Models;

use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Models\UserPhoto;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, MustVerifyEmailTrait, Notifiable, TwoFactorAuthenticatable, HasRoles;

    protected $guard_name = 'web';

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'role',
        'employee_id',
        'designation_id',
        'location',
        'district',
        'employment_status',
        'must_change_password',
        'user_group_id',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'must_change_password' => 'boolean',
        ];
    }

    protected $casts = [
        'email_verified_at' => 'datetime',
        'otp_verified_at' => 'datetime',
    ];

    // Force Fortify to treat users as two-factor authenticatable so the email OTP
    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    // public function designation()
    // {
    //     return $this->belongsTo(\App\Models\Designation::class);
    // }
    public function designation()
    {
        return $this->belongsTo(Designation::class);
    }
    public function photo()
    {
        return $this->hasOne(\App\Models\UserPhoto::class, 'user_id')
            ->where('is_current', true);
    }

    public function currentPhoto()
    {
        return $this->hasOne(\App\Models\UserPhoto::class)
            ->where('is_current', true);
    }

    public function userGroups()
    {
        return $this->belongsToMany(\App\Models\UserGroup::class, 'user_user_group');
    }

    public function divisions()
    {
        return $this->belongsToMany(\App\Models\Division::class, 'user_division');
    }

    public function userGroup()
    {
        return $this->belongsTo(UserGroup::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }


    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getPhotoUrlAttribute()
    {
        if (!$this->photo) {
            return null;
        }

        return asset('storage/' . $this->photo->path);
    }


    /*
    |--------------------------------------------------------------------------
    | Helper Methods
    |--------------------------------------------------------------------------
    */

    public function isAdminLike(): bool
    {
        $designation = $this->designation;
        $name = is_object($designation) ? ($designation->name ?? null) : $designation;

        return in_array($name, ['Admin', 'Administrator'], true);
    }

    public function isSfe(): bool
    {
        $designation = $this->designation;
        $name = is_object($designation) ? ($designation->name ?? null) : $designation;

        return $name === 'SFE';
    }

    public function isFe(): bool
    {
        $designation = $this->designation;
        $name = is_object($designation) ? ($designation->name ?? null) : $designation;

        return $name === 'FE';
    }
}
