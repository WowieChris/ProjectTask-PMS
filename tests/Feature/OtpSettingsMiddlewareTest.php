<?php

use App\Models\User;

test('accessing settings without OTP verification redirects to OTP page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/settings/profile');

    $response->assertRedirect(route('otp.show'));
});

test('accessing settings after settings-specific OTP verification is allowed through', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->withSession([
            'otp_passed' => true,
            'settings_otp_verified_at' => now()->timestamp,
        ])
        ->get('/settings/profile');

    $response->assertOk();
});

test('login OTP alone does not bypass the settings OTP prompt', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->withSession([
            'otp_passed' => true,
            'two_factor_verified_at' => now()->timestamp,
        ])
        ->get('/settings/profile');

    $response->assertRedirect(route('otp.show'));
});

test('accessing settings after settings OTP window has expired redirects to OTP page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->withSession([
            'otp_passed' => true,
            'settings_otp_verified_at' => now()->subMinutes(35)->timestamp,
        ])
        ->get('/settings/profile');

    $response->assertRedirect(route('otp.show'));
});
