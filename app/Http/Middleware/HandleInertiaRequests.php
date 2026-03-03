<?php

namespace App\Http\Middleware;

use App\Models\UserPhoto;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        $photoUrl = null;

        if ($user) {
            $currentPhoto = UserPhoto::where('user_id', $user->id)
                ->where('is_current', true)
                ->latest('id')
                ->first();

            $photoUrl = $currentPhoto ? asset('storage/'.$currentPhoto->path) : null;
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),

            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'photo_url' => $photoUrl,
                    'must_change_password' => (bool) $user->must_change_password,
                ] : null,
            ],

            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
