<?php

namespace App\Models;

use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, MustVerifyEmailTrait, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'role',
        'employee_id',
        'designation',
        'location',
        'district',
        'employment_status',
        'date_employed',
        'must_change_password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'date_employed' => 'date',
            'must_change_password' => 'boolean',
        ];
    }

    /**
     * Get the photos for the user.asdasdf l;
     */
    // In app/Models/User.php - this part is already correct
    public function photos()
    {
        return $this->hasMany(\App\Models\UserPhoto::class);
    }

    // Optional: Add a helper to get current photo
    public function currentPhoto()
    {

        return $this->hasOne(\App\Models\UserPhoto::class)->where('is_current', true);
    }
    /**
     * Determine if the user has two-factor authentication enabled.
     *
     * @return bool
     */
    // public function hasTwoFactorEnabled()
    // {
    //     return !is_null($this->two_factor_secret);
    // }
}
