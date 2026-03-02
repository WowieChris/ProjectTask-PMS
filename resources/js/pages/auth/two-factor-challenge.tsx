import { Head, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AppLayout from '@/layouts/app-layout';

export default function TwoFactorChallenge() {
  const form = useForm({
    code: '',
    recovery_code: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/two-factor-challenge', {
      preserveScroll: true,
      onFinish: () => {
        // optional: clear sensitive inputs after request
        form.reset('code', 'recovery_code');
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Two-Factor Challenge" />

      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label htmlFor="code">Authentication Code</Label>
          <Input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="123456"
            value={form.data.code}
            onChange={(e) => {
              form.setData('code', e.target.value);
              // optional: if user is using code, clear recovery
              if (form.data.recovery_code) form.setData('recovery_code', '');
            }}
          />
          <InputError className="mt-1" message={form.errors.code} />
        </div>

        <div>
          <Label htmlFor="recovery_code">Recovery Code</Label>
          <Input
            id="recovery_code"
            name="recovery_code"
            type="text"
            autoComplete="off"
            placeholder="Use recovery code if you can’t access your authenticator"
            value={form.data.recovery_code}
            onChange={(e) => {
              form.setData('recovery_code', e.target.value);
              // optional: if using recovery, clear code
              if (form.data.code) form.setData('code', '');
            }}
          />
          <InputError className="mt-1" message={form.errors.recovery_code} />
        </div>

        <Button type="submit" disabled={form.processing}>
          {form.processing ? 'Confirming...' : 'Confirm'}
        </Button>
      </form>
    </AppLayout>
  );
}