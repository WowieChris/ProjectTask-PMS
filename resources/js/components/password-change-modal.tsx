import { Form } from '@inertiajs/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import PasswordSetupController from '@/actions/App/Http/Controllers/Auth/PasswordSetupController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function PasswordChangeModal({ open }: { open: boolean }) {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={() => {}}>
            <DialogPortal>
                <DialogOverlay />
                <DialogPrimitive.Content
                    data-slot="dialog-content"
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    className="bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                >
                    <div className="flex flex-col gap-1.5">
                        <DialogPrimitive.Title className="text-lg leading-none font-semibold">
                            Set Your Password
                        </DialogPrimitive.Title>
                        <DialogPrimitive.Description className="text-muted-foreground text-sm">
                            You must set a new password before you can continue using the system.
                        </DialogPrimitive.Description>
                    </div>

                    <Form
                        {...PasswordSetupController.update.form()}
                        className="flex flex-col gap-4"
                    >
                        {({ processing, errors }) => (
                            <>
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

                                <Button className="w-full mt-2" disabled={processing}>
                                    {processing && <Spinner />}
                                    Set Password
                                </Button>
                            </>
                        )}
                    </Form>
                </DialogPrimitive.Content>
            </DialogPortal>
        </DialogPrimitive.Root>
    );
}
