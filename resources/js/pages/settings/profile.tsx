import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import * as React from 'react';
import { route } from 'ziggy-js';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit, update } from '@/routes/profile';
import type { BreadcrumbItem } from '@/types';

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
        <div className="flex flex-col w-full">
          <form
            onSubmit={submit}
            className="flex w-9/10 border rounded-lg p-4"
            encType="multipart/form-data"
          >
            <div className="flex flex-1 items-start justify-between gap-6">

              {/* LEFT SIDE */}
              <div className="flex flex-col w-1/2 gap-6">
                <Heading
                  variant="small"
                  title="Profile information"
                  description="Update your name, email address, and profile photo"
                />

                <div className="space-y-6">
                  {/* NAME */}
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={form.data.name}
                      onChange={(e) => form.setData('name', e.target.value)}
                      required
                    />
                    <InputError message={form.errors.name} />
                  </div>

                  {/* EMAIL */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.data.email}
                      onChange={(e) => form.setData('email', e.target.value)}
                      required
                    />
                    <InputError message={form.errors.email} />
                  </div>

                  {/* SAVE BUTTON */}
                  <div className="flex items-center gap-4">
                    <Button disabled={form.processing}>Save</Button>

                    <Transition show={form.recentlySuccessful}>
                      <p className="text-sm text-neutral-600">Saved</p>
                    </Transition>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col w-5/12 gap-5 border p-4 rounded-lg">
                <div className="aspect-square overflow-hidden rounded-full border">
                  {photoPreview ? (
                    <img src={photoPreview} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      No photo
                    </div>
                  )}
                </div>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={onPhotoChange}
                />

                <InputError message={form.errors.photo} />
              </div>
            </div>
          </form>
        </div>

      </SettingsLayout>
    </AppLayout>
  );
}