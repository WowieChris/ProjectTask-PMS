<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\UserPhoto;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();

        // get current photo from user_photos table
        $currentPhoto = UserPhoto::where('user_id', $user->id)
            ->where('is_current', true)
            ->latest('id')
            ->first();

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),

            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    // force Laravel URL (8000), not Vite (5173)
                    'photo_url' => $currentPhoto ? asset('storage/'.$currentPhoto->path) : null,
                ],
            ],
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        $request->validate([
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $path = $file->store('user_photos', 'public');

            // make old photos not current
            UserPhoto::where('user_id', $user->id)
                ->where('is_current', true)
                ->update(['is_current' => false]);

            // insert new current photo
            UserPhoto::create([
                'user_id' => $user->id,
                'disk' => 'public',
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'is_current' => true,
            ]);
        }

        $user->save();

        return to_route('profile.edit')->with('status', 'profile-updated');
    }

    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
