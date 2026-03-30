import { Link, usePage } from '@inertiajs/react';
import {
  Cog,
  Columns2Icon,
  Database,
  LayoutGrid,
  ListOrderedIcon,
  MapPin,
  MapPinned,
  NotepadTextDashedIcon,
  Search,
  User,
  Warehouse,
} from 'lucide-react';

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
  const userRole = auth?.user?.role ?? 'user';

  const mainNavItems: NavItem[] = [
    // 🔹 MAIN
    {
      section: 'Main',
      title: 'Dashboard',
      href: dashboard().url,
      icon: LayoutGrid,
    },


    // 🔹 OPERATIONS
    {
      section: 'Operations',
      title: 'Service Order',
      icon: ListOrderedIcon,
      children: [
        { title: 'Field Eng', href: '/service-order/field-eng' },
        { title: 'Technical Support Eng', href: '/service-order/technical-support-eng' },
        { title: 'Infrastructure Eng', href: '/service-order/infrastructure-eng' },
      ],
    },
    {
      section: 'Operations',
      title: 'Journal Movement',
      href: '/journalMovement', // ✅ fixed slash
      icon: NotepadTextDashedIcon,
    },

    // 🔹 MANAGEMENT
    {
      section: 'Management',
      title: 'Asset Management',
      href: '/assetManagement', // ✅ fixed slash
      icon: Columns2Icon,
    },
    {
      section: 'Management',
      title: 'Office Management',
      href: '/officeManagement', // ✅ fixed slash
      icon: Warehouse,
    },
    {
      section: 'Management',
      title: 'My Location',
      href: '/mylocation',
      icon: MapPin,
    },
  ];

  // 🔹 ADMIN SECTION
  if (userRole !== 'user') {
    mainNavItems.push(
      {
        section: 'Admin',
        title: 'User Maintenance',
        href: '/users',
        icon: User,
      },
      {
        section: 'Admin',
        title: 'ConfigFile',
        icon: Cog,
        children: [
          {

            title: 'Navigation',
            href: '/browse',
            icon: MapPinned,
          },
          { title: 'Senior Field Eng', href: '/ConfigFiles/SFE' },
          { title: 'Field Eng', href: '/ConfigFiles/Field-Eng' }, // ✅ fixed case + consistency
          { title: 'RBAC', href: '/config-files/technical-support-eng' },
        ],
      },
      {
        section: 'Admin',
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
      }
    );
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard().url} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* ✅ Now properly grouped */}
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}