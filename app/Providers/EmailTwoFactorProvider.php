<?php

namespace App\Providers;

use App\Models\EmailOtp;
use Carbon\Carbon;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;

class EmailTwoFactorProvider implements TwoFactorAuthenticationProvider
{
    public function generateSecretKey()
    {
        return bin2hex(random_bytes(16));
    }

    public function qrCodeUrl($companyName, $companyEmail, $secret)
    {
        return '';
    }

    public function verify($secret, $code)
    {
        $userId = session('login.id');

        if (! $userId || ! $code) {
            return false;
        }

        $now = Carbon::now();

        $otp = EmailOtp::where('user_id', $userId)
            ->where('used', false)
            ->where('expires_at', '>', $now)
            ->orderByDesc('created_at')
            ->first();

        if (! $otp) {
            return false;
        }

        $expected = hash('sha256', $code);

        if (hash_equals($otp->code_hash, $expected)) {
            $otp->used = true;
            $otp->save();

            return true;
        }

        return false;
    }
}
