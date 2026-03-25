import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const { isCurrentUrl } = useCurrentUrl();

  // ✅ GROUP ITEMS BY SECTION (FIXED LOCATION)
  const groupedItems = items.reduce((acc, item) => {
    const section = item.section || 'Other';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <SidebarGroup className="px-2 py-0">
      {/* Optional: remove if you don’t want static label */}
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      {/* ✅ LOOP PER SECTION */}
      {Object.entries(groupedItems).map(([section, sectionItems]) => (
        <div key={section} className="mb-4">
          {/* ✅ SECTION TITLE */}
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase">
            {section}
          </p>

          <SidebarMenu>
            {sectionItems.map((item) => {
              const hasChildren = !!item.children?.length;

              const isActive =
                (item.href ? isCurrentUrl(item.href) : false) ||
                (item.children?.some((c) => c.href && isCurrentUrl(c.href)) ?? false);

              // ✅ SINGLE LINK
              if (!hasChildren) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={!!item.href && isCurrentUrl(item.href)}
                      tooltip={{ children: item.title }}
                    >
                      <Link href={item.href ?? '#'} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              // ✅ DROPDOWN
              return (
                <Collapsible key={item.title} defaultOpen={isActive}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive} tooltip={{ children: item.title }}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children!.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={!!child.href && isCurrentUrl(child.href)}
                            >
                              <Link href={child.href ?? '#'} prefetch>
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}