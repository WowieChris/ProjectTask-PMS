import { usePage } from "@inertiajs/react";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    type PageProps = {
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
                photo_url?: string | null;
            } | null;
        };
    };

    const { auth } = usePage<PageProps>().props;  // ✅ move here
    const getInitials = useInitials();

    return (
        <>
            <Avatar>
                <AvatarImage
                    src={auth?.user?.photo_url ?? undefined}
                    alt={auth?.user?.name ?? "User"}
                />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white">
                    {getInitials(auth?.user?.name ?? user.name)}
                </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}