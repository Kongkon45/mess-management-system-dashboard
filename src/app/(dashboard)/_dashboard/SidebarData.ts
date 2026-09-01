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

export const sidebarMenu: SidebarSection[] = [
  {
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Meals',
        href: '/meals',
        icon: Utensils,
      },
      {
        title: 'Add Meal',
        href: '/meals/add',
        icon: Plus,
      },
     
      {
        title: 'Meal Schedule',
        href: '/meal-schedule',
        icon: CalendarDays,
      },
     
      {
        title: 'Users',
        href: '/users',
        icon: Users,
      },
      {
        title: 'Payments',
        href: '/payments',
        icon: CreditCard,
      },
      {
        title: 'Reports',
        href: '/reports',
        icon: BarChart3,
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
      },
    ],
  },
];

