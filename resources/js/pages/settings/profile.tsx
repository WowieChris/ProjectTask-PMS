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

  const form = useForm<ProfileForm>({
    name: auth.user.name ?? '',
    email: auth.user.email ?? '',
    photo: null,
    _method: 'patch',
  });

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    form.setData('photo', file);

    if (!file) {
      setPhotoPreview(auth.user.photo_url ?? null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  React.useEffect(() => {
    return () => {
      if (photoPreview?.startsWith('blob:')) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('photo in form:', form.data.photo); // should be a File
    form.post(update().url, {
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
          <form onSubmit={submit} className="flex w-9/10 border rounded-lg p-4">
            <div className="flex flex-1 items-start justify-between">
              {/* LEFT SIDE — FORM FIELDS */}
              <div className=" flex flex-col w-1/2 gap-6">
              <Heading
            variant="small"
            title="Profile information"
            description="Update your name, email address, and profile photo"
          />
              <div className="flex flex-col w-full max-w-xl gap-8"> 
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>

                  <Input
                    id="name"
                    className="mt-1 block w-3/4"
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
                    className="mt-1 block w-3/4"
                    value={form.data.email}
                    onChange={(e) => form.setData('email', e.target.value)}
                    name="email"
                    required
                    autoComplete="username"
                    placeholder="Email address"
                  />

                  <InputError className="mt-2" message={form.errors.email} />
                </div>

            {/* ✅ KEEP THIS: save button + saved transition */}
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
           </div> 
          </div>
            {/*end of left */}
             

             {/* RIGHT SIDE — PROFILE PHOTO */}
              <div className="flex flex-col w-5/12 gap-5 border p-4 rounded-lg">
                <div className="flex w-full  my-auto aspect-square overflow-hidden rounded-full border bg-muted shadow" >
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
                name="photo"
                type="file"
                accept="image/*"
                onChange={onPhotoChange}
                className="max-w-[180px] mx-auto"
              />

                <InputError className="mt-2 text-center" message={form.errors.photo} />
              </div>
            </div>

          </form>
        </div>
            
      </SettingsLayout>
    </AppLayout>
  );
}