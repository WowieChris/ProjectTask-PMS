<?php

namespace App\Actions;

use Illuminate\Auth\Events\Failed;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable as BaseRedirect;
use Laravel\Fortify\Events\TwoFactorAuthenticationChallenged;

class RedirectIfTwoFactorAuthenticatable extends BaseRedirect
{
    /**
     * Override to also challenge users who have chosen email two-factor.
     */
    protected function twoFactorChallengeResponse($request, $user)
    {
        $request->session()->put([
            'login.id' => $user->getKey(),
            'login.remember' => $request->boolean('remember'),
        ]);

        TwoFactorAuthenticationChallenged::dispatch($user);

        return $request->wantsJson()
            ? response()->json(['two_factor' => true])
            : redirect()->route('two-factor.login');
    }

    public function handle($request, $next)
    {
        $user = $this->validateCredentials($request);

        // If user selected email as their method, challenge them regardless of TOTP secret
        if ($user && $user->two_factor_method === 'email') {
            return $this->twoFactorChallengeResponse($request, $user);
        }

        return parent::handle($request, $next);
    }
}
