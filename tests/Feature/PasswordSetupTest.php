<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

it('shares must_change_password as true for users who must change password', function () {
    $user = User::factory()->create([
        'must_change_password' => true,
        'location' => 'Test',
    ]);

    $this->actingAs($user)
        ->withSession(['otp_passed' => true])
        ->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page
            ->where('auth.user.must_change_password', true)
        );
});

it('shares must_change_password as false for normal users', function () {
    $user = User::factory()->create([
        'must_change_password' => false,
        'location' => 'Test',
    ]);

    $this->actingAs($user)
        ->withSession(['otp_passed' => true])
        ->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page
            ->where('auth.user.must_change_password', false)
        );
});

it('sets a new password and clears must_change_password flag', function () {
    $user = User::factory()->create([
        'must_change_password' => true,
        'location' => 'Test',
    ]);

    $this->actingAs($user)
        ->withSession(['otp_passed' => true])
        ->post(route('password.setup.update'), [
            'password' => 'NewSecurePass123!',
            'password_confirmation' => 'NewSecurePass123!',
        ])
        ->assertRedirect(route('dashboard'));

    $user->refresh();

    expect($user->must_change_password)->toBeFalse();
    expect(Hash::check('NewSecurePass123!', $user->password))->toBeTrue();
});

it('fails password setup with mismatched password confirmation', function () {
    $user = User::factory()->create([
        'must_change_password' => true,
        'location' => 'Test',
    ]);

    $this->actingAs($user)
        ->withSession(['otp_passed' => true])
        ->post(route('password.setup.update'), [
            'password' => 'NewSecurePass123!',
            'password_confirmation' => 'DifferentPass123!',
        ])
        ->assertSessionHasErrors('password');
});
