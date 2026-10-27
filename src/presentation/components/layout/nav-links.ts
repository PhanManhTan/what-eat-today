import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  ShoppingCart,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    description: 'Macro overview & daily nutrition targets',
  },
  {
    name: 'Recipes',
    href: '/recipes',
    icon: UtensilsCrossed,
    description: 'Recipe catalog with exact gram weights',
  },
  {
    name: 'Meal Planner',
    href: '/planner',
    icon: CalendarDays,
    description: '7-day manual meal planner with daily floors',
  },
  {
    name: 'Grocery List',
    href: '/grocery',
    icon: ShoppingCart,
    description: 'Aisle-sorted smart shopping checklist',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Local profile, units, and data backups',
  },
];
