import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import PasswordSetupController from '@/actions/PasswordSetupController';

export default function PasswordSetup() {
    return (
        <AuthLayout
            title="Set your password"
            description="You must set a new password before continuing."
        >
            <Head title="Set password" />

            <Form
                {...PasswordSetupController.update.form()}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoFocus
                                    autoComplete="new-password"
                                    placeholder="New password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <Button className="w-full" disabled={processing}>
                            {processing && <Spinner />}
                            Set Password
                        </Button>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
