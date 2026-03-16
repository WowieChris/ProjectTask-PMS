<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceOrder extends Model
{
    protected $fillable = [
        'tse_jo_no',
        'tse_assigned',
        'requesting_party',
        'department',
        'location',
        'date_reported',
        'issues_encountered',
        'technical_issue_description',
        'action_taken',
        'frequency',
        'turnaround_time_mins',
        'status'
    ];
}
