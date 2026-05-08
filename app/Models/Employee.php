<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'employee_id',
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'contact_number',
        'birthdate',
        'gender',
        'address',
        'designation_id',
        'branch_id',
        'division_id',
        'district_id',
        'area_id',
        'date_hired',
        'employment_status',
        'photo',
        'sss',
        'philhealth',
        'pagibig',
        'tin',
        'user_id',
    ];

    public function designation()
    {
        return $this->belongsTo(Designation::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
