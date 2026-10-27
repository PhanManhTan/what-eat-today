import {
  Compass,
  Heart,
  CalendarDays,
  UtensilsCrossed,
  ShoppingCart,
  Activity,
  Settings,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  id: string;
  nameKey: string;
  descKey: string;
  href: string;
  icon: LucideIcon;
  isBottomNav?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'discover',
    nameKey: 'discover',
    descKey: 'discoverDesc',
    href: '/',
    icon: Sparkles,
    isBottomNav: true,
  },
  {
    id: 'explore',
    nameKey: 'explore',
    descKey: 'exploreDesc',
    href: '/explore',
    icon: Compass,
    isBottomNav: true,
  },
  {
    id: 'favorites',
    nameKey: 'favorites',
    descKey: 'favoritesDesc',
    href: '/favorites',
    icon: Heart,
    isBottomNav: true,
  },
  {
    id: 'planner',
    nameKey: 'planner',
    descKey: 'plannerDesc',
    href: '/planner',
    icon: CalendarDays,
    isBottomNav: true,
  },
  {
    id: 'recipes',
    nameKey: 'recipes',
    descKey: 'recipesDesc',
    href: '/recipes',
    icon: UtensilsCrossed,
    isBottomNav: false,
  },
  {
    id: 'grocery',
    nameKey: 'grocery',
    descKey: 'groceryDesc',
    href: '/grocery',
    icon: ShoppingCart,
    isBottomNav: false,
  },
  {
    id: 'nutrition',
    nameKey: 'nutrition',
    descKey: 'nutritionDesc',
    href: '/nutrition',
    icon: Activity,
    isBottomNav: false,
  },
  {
    id: 'settings',
    nameKey: 'settings',
    descKey: 'settingsDesc',
    href: '/settings',
    icon: Settings,
    isBottomNav: true,
  },
];
