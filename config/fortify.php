<?php

use Laravel\Fortify\Features;

return [

    'guard' => 'web',

    'passwords' => 'users',

    'username' => 'email',

    'email' => 'email',

    // ✅ After login redirect target (we want OTP first)
    'home' => '/otp',

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
        // Features::emailVerification(),
        // Features::updateProfileInformation(),
        // Features::updatePasswords(),
        // Features::twoFactorAuthentication(),
    ],
];