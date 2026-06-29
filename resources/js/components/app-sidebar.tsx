import { Link, usePage } from '@inertiajs/react';
import {
  Badge,
  BadgeCheck,
  Building,
  Building2,
  Building2Icon,
  BuildingIcon,
  Cog,
  Columns2Icon,
  Database,
  FileUser,
  LayoutGrid,
  ListOrderedIcon,
  LucideIdCard,
  MapPin,
  MapPinCheckInside,
  MapPinHouse,
  MapPinned,
  Monitor,
  NotepadTextDashedIcon,
  Search,
  User,
  UserRound,
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
      href: '/asset-management/dashboard',
      icon: Columns2Icon,
      children: [
        {
          title: 'Assets',
          href: '/asset-management/assets',
        },
        {
          title: 'Categories',
          href: '/asset-management/categories',
        },
        {
          title: 'Assignments',
          href: '/asset-management/assignments',
        },
        {
          title: 'Transfers',
          href: '/asset-management/transfers',
        },
      ],
    },
    {
      section: 'Management',
      title: 'Office Management',
      href: '/officeManagement',
      icon: Warehouse,
      children: [
        {
          title: 'EA Monitoring',
          href: '/EAMonitoring',
          children: [
            { title: 'Request', href: '/EAMonitoring/Request' },
            { title: 'HVA', href: '/EAMonitoring/HVA' },
            { title: 'TAR', href: '/EAMonitoring/TAR' },
          ],
        },
      ],
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

      //Mapping
      {
        section: 'Admin',
        title: 'GeoLocation',
        href: '/GeoMap',
        icon: User,
      },

      {
        section: 'Admin',
        title: 'Configuration File',
        icon: Cog,
        children: [
          {

            title: 'Location Master FIle',
            href: '/ConfigFiles/Navigation',
            icon: MapPinned,
          },
          {
            title: 'Central Office Master FIle',
            href: '',
            icon: MapPinHouse
          },
          // { title: 'Field Eng', href: '/ConfigFiles/Field-Eng' }, // ✅ fixed case + consistency
          {
            title: 'RBAC',
            href: '/config-files/technical-support-eng',
          },
        ],
      },
      {
        section: 'Admin',
        title: 'Master Files',
        icon: Database,
        children: [
          {
            title: 'User Groups',
            href: '/user-groups',
            icon: UserRound
          },
          {
            title: 'Designations',
            href: '/designations',
            icon: LucideIdCard,
          },
          { title: 'Department', href: '/branches', icon: BuildingIcon },

          { title: 'Divisions', href: '/divisions', icon: BadgeCheck, },
          { title: 'Districts', href: '/districts', icon: MapPinned, },
          { title: 'Areas', href: '/areas', icon: MapPinCheckInside, },
          { title: 'Branches', href: '/branches', icon: Building2 },
          {
            title: 'Employee Management',
            href: '/employees',
            icon: FileUser,
          },

        ],
      },
      //geomap
      {
        title: 'Geomap',
        href: '/officemap',
        icon: MapPin,
      },
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