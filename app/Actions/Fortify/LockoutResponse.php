<?php

namespace App\Actions\Fortify;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Responsable;
use Laravel\Fortify\Contracts\LockoutResponse as LockoutResponseContract;

class LockoutResponse implements LockoutResponseContract
{
    public function toResponse($request)
    {
        $seconds = 60;

        return response(trans('auth.throttle', [
            'seconds' => $seconds,
            'minutes' => ceil($seconds / 60),
        ]), 429);
    }
}
