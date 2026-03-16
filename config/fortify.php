<?php

use Laravel\Fortify\Features;

return [

    'guard' => 'web',

    'passwords' => 'users',

    'username' => 'email',

    'email' => 'email',

    // After login redirect target (application home)
    'home' => '/dashboard',

    'prefix' => '',

    'domain' => null,

    'middleware' => ['web'],

    'limiters' => [
        'login' => null,
        'two-factor' => null,
    ],

    'views' => true,

    'features' => [
        // keep empty unless you explicitly want these features
        // Features::registration(),
        // Features::resetPasswords(),
        Features::emailVerification(),
        // Two-factor authentication is handled by the custom /otp flow (OtpController + EnsureOtpVerified).
        // Features::twoFactorAuthentication(),
        // Features::updateProfileInformation(),
        // Features::updatePasswords(),
    ],
];
