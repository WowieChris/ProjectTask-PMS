
import { Form, Head, router } from '@inertiajs/react';
// import { route } from 'ziggy-js';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { verify, resend } from '@/routes/otp';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

type Props = { status?: string };

export default function Otp({ status }: Props) {
  const { props } = usePage();
  useEffect(() => {
    if (props.otp_debug) {
      console.log('OTP:', props.otp_debug);
    }
  }, [props.otp_debug]);
  return (
    <AuthLayout
      title="Verify OTP"
      description="Enter the 6-digit code we sent to your email."
    >
      <Head title="Verify OTP" />

      <Form {...verify.form()} className="flex flex-col gap-6">
        {({ processing, errors }) => (
          <>
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                name="otp"
                inputMode="numeric"
                autoFocus
                placeholder="123456"
                maxLength={6}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.value = el.value.replace(/\D/g, '').slice(0, 6);
                }}
              />
              <InputError message={errors.otp} />
            </div>

            <Button type="submit" className="w-full" disabled={processing}>
              {processing && <Spinner />}
              Verify
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => router.post(resend.form().action)}
              disabled={processing}
            >
              Resend OTP
            </Button>
          </>
        )}
      </Form>

      {status && (
        <div className="mt-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </AuthLayout>
  );
}