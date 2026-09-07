import {
  LayoutDashboard,
  Utensils,
  Plus,
  Tags,
  CalendarDays,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  ClipboardList,
  Store,
  ReceiptText,
  CalendarCheck,
  LucideIcon,
} from 'lucide-react';

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarSection {
  items: SidebarItem[];
}

export const adminSidebarMenu: SidebarSection[] = [
  {
    items: [
      {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Member Management',
        href: '/member-management',
        icon: Users,
      },
      {
        title: 'Meal Management',
        href: '/meal-management',
        icon: Utensils,
      },
      {
        title: 'Market Management',
        href: '/market-management',
        icon: Store,
      },
      {
        title: 'Utility Management',
        href: '/utility-management',
        icon: ReceiptText,
      },
      {
        title: 'Monthly Selection',
        href: '/monthly-selection',
        icon: CalendarCheck,
      },
    ],
  },
];

export const memberSidebarMenu: SidebarSection[] = [
  {
    items: [
      {
        title: 'Dashboard',
        href: '/user/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'My Meals',
        href: '/meals',
        icon: Utensils,
      },
      {
        title: 'Meal Schedule',
        href: '/meal-schedule',
        icon: CalendarDays,
      },
    ],
  },
];

export const settingsItem: SidebarItem = {
  title: 'Settings',
  href: '/settings',
  icon: Settings,
};

