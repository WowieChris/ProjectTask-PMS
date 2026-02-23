<?php

namespace App\Providers;

use Illuminate\Contracts\Cache\Repository as CacheRepository;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider as TwoFactorAuthenticationProviderContract;

class EmailTwoFactorProvider implements TwoFactorAuthenticationProviderContract
{
    /** @var \Laravel\Fortify\TwoFactorAuthenticationProvider */
    protected $defaultProvider;

    /** @var \Illuminate\Contracts\Cache\Repository|null */
    protected $cache;

    public function __construct($defaultProvider, ?CacheRepository $cache = null)
    {
        $this->defaultProvider = $defaultProvider;
        $this->cache = $cache;
    }

    public function generateSecretKey()
    {
        return $this->defaultProvider->generateSecretKey();
    }

    public function qrCodeUrl($companyName, $companyEmail, $secret)
    {
        return $this->defaultProvider->qrCodeUrl($companyName, $companyEmail, $secret);
    }

    /**
     * Verify the given token.
     *
     * This provider supports the default TOTP verification as a fallback,
     * but will first check for an email code stored in the cache keyed by
     * the challenged user's id (session 'login.id').
     */
    public function verify($secret, $code)
    {
        try {
            $userId = session('login.id');

            if ($userId) {
                $key = 'fortify.email_2fa.'.$userId;

                if ($this->cache && $this->cache->has($key)) {
                    $stored = (string) $this->cache->get($key);

                    if (hash_equals($stored, (string) $code)) {
                        $this->cache->forget($key);
                        session()->forget('login.id');

                        return true;
                    }
                }
            }
        } catch (\Throwable $e) {
            // ignore and fall back to default provider
        }

        return $this->defaultProvider->verify($secret, $code);
    }
}
