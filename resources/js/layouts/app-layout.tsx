import { usePage } from '@inertiajs/react';
import PasswordChangeModal from '@/components/password-change-modal';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage().props;
    const mustChangePassword = auth.user?.must_change_password ?? false;

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <PasswordChangeModal open={mustChangePassword} />
            {children}
        </AppLayoutTemplate>
    );
};
