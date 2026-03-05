<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

Illuminate\Support\Facades\Facade::setFacadeApplication($app);

echo "MAIL_MAILER=".env('MAIL_MAILER')."\n";
echo "MAIL_LOG_CHANNEL=".env('MAIL_LOG_CHANNEL', 'null')."\n";
echo "LOG_CHANNEL=".env('LOG_CHANNEL', 'null')."\n";
echo "app.mail.default=".json_encode(config('mail.default'))."\n";
echo "mailers.log.channel=".json_encode(config('mail.mailers.log.channel'))."\n";

$logFile = __DIR__ . '/../storage/logs/laravel.log';
if (file_exists($logFile)) {
    echo "\n--- last 60 lines of laravel.log ---\n";
    $lines = 60;
    $data = file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $total = count($data);
    $start = max(0, $total - $lines);
    for ($i = $start; $i < $total; $i++) {
        echo $data[$i]."\n";
    }
} else {
    echo "laravel.log not found at $logFile\n";
}
