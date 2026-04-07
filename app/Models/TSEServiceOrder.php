<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TSEServiceOrder extends Model
{
    //
    protected $table = 'tse_service_orders';
    protected $fillable = [
        'job_order',
        'date_created',
        'date_reported',
        'requesting_party',
        'requesting_party_designation',
        'requesting_party_email',
        'designated_engineer',
        'engineer_designation',
        'employee_id',
        'service_category',
        'issue_category',
        'description',
        'status',
        'complexity_level',
        'complexity_rating',
        'actual_service_time_minutes',
        'action_taken',
        'overall_rating',
        'customer_feedback',
        'completion_rating',
        'completion_status',
        'is_locked'
    ];
}
