import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Star, Leaf } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'mondstadt', icon: Leaf, label: 'Mondstadt' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'midnight', icon: Star, label: 'Midnight' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 midnight:bg-[#151345] mondstadt:bg-green-100',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5',
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100 midnight:bg-[#26236b] midnight:text-[#e6e6ff] mondstadt:bg-green-600 mondstadt:text-white'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60 midnight:text-[#b3b3ff] midnight:hover:bg-[#26236b]/60 mondstadt:text-green-600 mondstadt:hover:bg-green-100',
                    )}
                >
                    
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
