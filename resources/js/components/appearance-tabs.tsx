import type { LucideIcon } from 'lucide-react';
import { Lollipop, Martini, Monitor, Moon, Star, Sun, Leaf } from 'lucide-react';
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
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'midnight', icon: Star, label: 'Midnight' },
        { value: 'vegas', icon: Martini, label: 'Vegas' },
        { value: 'candy', icon: Lollipop, label: 'Candy' },
        { value: 'mondstadt', icon: Leaf, label: 'Mondstadt' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 midnight:bg-[#151345] vegas:bg-[#1900ff]',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100 midnight:bg-[#26236b] midnight:text-[#e6e6ff] vegas:bg-[#00ff00] vegas:text-[#000000] candy:bg-pink-500 candy:text-white mondstadt:bg-green-600 mondstadt:text-white'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60 midnight:text-[#b3b3ff] midnight:hover:bg-[#26236b]/60 vegas:text-[#00ff00] vegas:hover:bg-[#1a1a1a] candy:text-purple-600 candy:hover:bg-white/50 mondstadt:text-green-600 mondstadt:hover:bg-green-100',
                    )}
                >
                    
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
