<?php

return [
    'base_url' => env('NOMINATIM_BASE_URL', 'https://nominatim.openstreetmap.org'),

    // Nominatim's usage policy requires a User-Agent that identifies your actual
    // application — a default library/browser User-Agent will get you blocked.
    // Including a contact email is recommended best practice.
    'user_agent' => env('NOMINATIM_USER_AGENT', 'YourAppName/1.0 (you@example.com)'),
];
