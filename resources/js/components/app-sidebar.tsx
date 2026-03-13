import { Link, usePage } from '@inertiajs/react';
import { Columns2Icon, Database, LayoutGrid, ListOrderedIcon, NotepadTextDashedIcon, Search, User, Warehouse } from 'lucide-react';

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
  // Defensive: `auth` or `auth.user` may be null during some hydration paths
  // (e.g. unauthenticated or server-client mismatch). Default to 'user'
  // so admin menus are hidden when role is unavailable.
  const userRole = auth?.user?.role ?? 'user';

  const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: dashboard().url,
      icon: LayoutGrid,
    },
    {
      title: 'Browse',
      href: '/browse',
      icon: Search,
    },
    {
      title: 'Service Order',
      href: 'serviceOrder',
      icon: ListOrderedIcon,
    },
    {
      title: 'Asset Management',
      href: 'assetManagement',
      icon: Columns2Icon,
    },
    {
      title: 'Journal Movement',
      href: 'journalMovement',
      icon: NotepadTextDashedIcon,
    },
    {
      title: 'Office Management',
      href: 'officeManagement',
      icon: Warehouse,
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
        { title: 'Areas', href: '/areas' },
        { title: 'Branches', href: '/branches' },
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