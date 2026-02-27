import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import * as React from 'react';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import type { BreadcrumbItem } from '@/types';

declare function route(name: string): string;

type PageProps = {
  auth: {
    user: {
      name: string;
      email: string;
      photo_url?: string | null;
    };
  };
};

type ProfileForm = {
  name: string;
  email: string;
  photo: File | null;

  // ✅ for file uploads with "post" while still doing PATCH on backend
  _method?: 'patch';
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Profile settings',
    href: edit().url,
  },
];

export default function Profile() {
  const { auth } = usePage<PageProps>().props;

  const [photoPreview, setPhotoPreview] = React.useState<string | null>(
    auth.user.photo_url ?? null
  );

  // Track blob URL so we only revoke blobs we created
  const blobUrlRef = React.useRef<string | null>(null);

  const form = useForm<ProfileForm>({
    name: auth.user.name ?? '',
    email: auth.user.email ?? '',
    photo: null,
    _method: 'patch',
  });

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    form.setData('photo', file);

    // Revoke old blob if it exists
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (!file) {
      setPhotoPreview(auth.user.photo_url ?? null);
      return;
    }

    const url = URL.createObjectURL(file);
    blobUrlRef.current = url;
    setPhotoPreview(url);
  };

  React.useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ safest for files: POST + _method=patch + forceFormData
    form.post(route('profile.update'), {
      preserveScroll: true,
      forceFormData: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <h1 className="sr-only">Profile Settings</h1>

      <SettingsLayout>
        <div className="space-y-6">
          <Heading
            variant="small"
            title="Profile information"
            description="Update your name, email address, and profile photo"
          />

          <form
            onSubmit={submit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <div className="grid gap-8 md:grid-cols-[1fr_220px] items-start">
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>

                  <Input
                    id="name"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                  />

                  <InputError className="mt-2" message={form.errors.name} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>

                  <Input
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={form.data.email}
                    onChange={(e) => form.setData('email', e.target.value)}
                    name="email"
                    required
                    autoComplete="username"
                    placeholder="Email address"
                  />

                  <InputError className="mt-2" message={form.errors.email} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="h-40 w-40 overflow-hidden rounded-full border bg-muted shadow">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                      No photo
                    </div>
                  )}
                </div>

                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={onPhotoChange}
                  className="max-w-[180px]"
                />

                <InputError className="mt-2 text-center" message={form.errors.photo} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={form.processing} data-test="update-profile-button">
                Save
              </Button>

              <Transition
                show={form.recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Saved</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}