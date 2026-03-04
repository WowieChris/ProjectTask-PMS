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

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.children?.length;

          // active if current href OR any child href is active
          const isActive =
            (item.href ? isCurrentUrl(item.href) : false) ||
            (item.children?.some((c) => c.href && isCurrentUrl(c.href)) ?? false);

          if (!hasChildren) {
            // ✅ Normal single link
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

          // ✅ Dropdown item
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
                        <SidebarMenuSubButton asChild isActive={!!child.href && isCurrentUrl(child.href)}>
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
    </SidebarGroup>
  );
}