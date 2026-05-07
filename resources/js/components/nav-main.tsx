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

  const groupedItems = items.reduce((acc, item) => {
    const section = item.section || 'Other';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      {Object.entries(groupedItems).map(([section, sectionItems]) => (
        <div key={section} className="mb-4">
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase">
            {section}
          </p>

          <SidebarMenu>
            {sectionItems.map((item) => {
              const hasChildren = !!item.children?.length;

              const isActive =
                (item.href ? isCurrentUrl(item.href) : false) ||
                (item.children?.some((c) =>
                  (c.href && isCurrentUrl(c.href)) ||
                  c.children?.some((gc) => !!gc.href && isCurrentUrl(gc.href))
                ) ?? false);

              // ── SINGLE LINK (no children) ──
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

              // ── DROPDOWN (has children) ──
              return (
                <Collapsible key={item.title} defaultOpen={isActive}>
                  <SidebarMenuItem>
                    <div className="flex items-center w-full">

                      {/* ✅ CLICKABLE PARENT LINK */}
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={{ children: item.title }}
                        className="flex-1"
                      >
                        <Link href={item.href ?? '#'} prefetch>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>

                      {/* ✅ SEPARATE CHEVRON TOGGLE */}
                      <CollapsibleTrigger asChild>
                        <button className="px-2 py-1 hover:text-foreground text-muted-foreground transition-colors">
                          <ChevronDown
                            size={14}
                            className="transition-transform group-data-[state=open]:rotate-180"
                          />
                        </button>
                      </CollapsibleTrigger>

                    </div>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children!.map((child) => (
                          <SidebarMenuSubItem key={child.title}>

                            {child.children?.length ? (
                              // ── CHILD WITH GRANDCHILDREN ──
                              <Collapsible
                                defaultOpen={child.children.some(
                                  (gc) => !!gc.href && isCurrentUrl(gc.href)
                                )}
                              >
                                <div className="flex items-center w-full">

                                  {/* ✅ CLICKABLE CHILD LINK */}
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={!!child.href && isCurrentUrl(child.href)}
                                    className="flex-1"
                                  >
                                    <Link href={child.href ?? '#'} prefetch>
                                      {child.icon && <child.icon />}
                                      <span>{child.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>

                                  {/* ✅ SEPARATE CHEVRON TOGGLE */}
                                  <CollapsibleTrigger asChild>
                                    <button className="px-2 py-1 hover:text-foreground text-muted-foreground transition-colors">
                                      <ChevronDown
                                        size={14}
                                        className="transition-transform group-data-[state=open]:rotate-180"
                                      />
                                    </button>
                                  </CollapsibleTrigger>

                                </div>

                                <CollapsibleContent>
                                  <SidebarMenuSub className="pl-4 border-l border-border/50 ml-3">
                                    {child.children.map((grandchild) => (
                                      <SidebarMenuSubItem key={grandchild.title}>
                                        <SidebarMenuSubButton
                                          asChild
                                          isActive={!!grandchild.href && isCurrentUrl(grandchild.href)}
                                        >
                                          <Link href={grandchild.href ?? '#'} prefetch>
                                            {grandchild.icon && <grandchild.icon />}
                                            <span>{grandchild.title}</span>
                                          </Link>
                                        </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                    ))}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </Collapsible>
                            ) : (
                              // ── SIMPLE CHILD LINK ──
                              <SidebarMenuSubButton
                                asChild
                                isActive={!!child.href && isCurrentUrl(child.href)}
                              >
                                <Link href={child.href ?? '#'} prefetch>
                                  {child.icon && <child.icon />}
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            )}

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