<?php

require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

Illuminate\Support\Facades\Facade::setFacadeApplication($app);

Illuminate\Support\Facades\Mail::raw('test from script', function ($m) {
    $m->to('miles@example.com')->subject('test');
});

echo "script finished\n";
