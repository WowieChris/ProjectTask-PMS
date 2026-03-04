import { Link, usePage } from '@inertiajs/react';
import { Database, LayoutGrid, User } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

type AuthUser = {
  role: 'user' | 'admin' | string;
};

type PageProps = {
  auth: {
    user: AuthUser;
  };
};

export function AppSidebar() {
  const { auth } = usePage<PageProps>().props;
  const userRole = auth.user.role;

  const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: dashboard().url,
      icon: LayoutGrid,
    },
  ];

  // ✅ Show admin menus
  if (userRole !== 'user') {
    // ✅ Bring back User Maintenance
    mainNavItems.push({
      title: 'User Maintenance',
      href: '/users',
      icon: User,
    });

    // ✅ New Master Files dropdown
    mainNavItems.push({
      title: 'Master Files',
      icon: Database,
      children: [
        { title: 'User Groups', href: '/user-groups' },
        { title: 'Designations', href: '/designations' },
        { title: 'Divisions', href: '/divisions' },
        { title: 'Districts', href: '/districts' },
      ],
    });
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/* ✅ fix: dashboard().url */}
              <Link href={dashboard().url} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}