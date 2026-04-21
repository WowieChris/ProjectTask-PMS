<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('engineers:apply-scheduled-transfers')
    ->everyMinute()
    ->withoutOverlapping()   // prevents pile-up if a run takes >60s
    ->runInBackground();     // doesn't block other scheduled tasks
 