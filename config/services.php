<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'psgc' => [
        'base_url' => env('PSGC_API_BASE_URL'),
        'version' => env('PSGC_API_VERSION'),
        'token' => env('PSGC_API_TOKEN'),
        'timeout' => env('PSGC_API_TIMEOUT', 120),
        'page_size' => env('PSGC_API_PAGE_SIZE', 1000),
        'retry_count' => env('PSGC_API_RETRY_COUNT', 3),
        'retry_delay_ms' => env('PSGC_API_RETRY_DELAY_MS', 1500),
    ],


];
