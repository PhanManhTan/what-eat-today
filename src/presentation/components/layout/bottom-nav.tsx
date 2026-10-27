import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from './nav-links';

export const BottomNav: React.FC = () => {
  const { t } = useTranslation('navigation');
  const bottomNavItems = NAV_ITEMS.filter((item) => item.isBottomNav);

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 md:hidden pb-safe"
    >
      <div className="flex h-16 items-center justify-around px-2">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 select-none ${
                  isActive
                    ? 'font-semibold text-primary scale-105'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="mt-1 text-[11px] leading-tight tracking-tight">
                    {t(item.nameKey)}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
