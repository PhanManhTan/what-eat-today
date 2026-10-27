import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from './nav-links';
import { Moon, Sun, Menu, X, Sparkles, Globe, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation(['common', 'navigation']);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('vi') ? 'en-US' : 'vi-VN';
    i18n.changeLanguage(nextLang);
  };

  const isVi = i18n.language.startsWith('vi');

  // Primary desktop navigation (first 4 items)
  const primaryDesktopNav = NAV_ITEMS.slice(0, 4);
  const secondaryDesktopNav = NAV_ITEMS.slice(4);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="group flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-base font-extrabold leading-none text-foreground sm:text-lg">
                {isVi ? 'Hôm Nay Ăn Gì?' : 'What Eat Today'}
              </span>
              <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                {isVi ? 'Khám phá ẩm thực' : 'Food Discovery'}
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Desktop Navigation">
          {primaryDesktopNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{t(item.nameKey, { ns: 'navigation' })}</span>
              </NavLink>
            );
          })}

          {/* More Dropdown for Desktop */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span>{isVi ? 'Thêm' : 'More'}</span>
            </Button>

            {moreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border bg-card p-1.5 shadow-lg">
                  {secondaryDesktopNav.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? 'bg-primary/10 font-semibold text-primary'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`
                        }
                      >
                        <Icon className="h-4 w-4" />
                        <span>{t(item.nameKey, { ns: 'navigation' })}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 text-xs font-semibold text-foreground hover:bg-muted"
            title={isVi ? 'Chuyển sang English' : 'Switch to Tiếng Việt'}
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{isVi ? 'VI' : 'EN'}</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Mobile hamburger for secondary links */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b bg-card px-4 py-4 md:hidden shadow-md">
          <nav className="flex flex-col space-y-1">
            <p className="px-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {isVi ? 'Tất cả chuyên mục' : 'All Modules'}
            </p>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 font-bold text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{t(item.nameKey, { ns: 'navigation' })}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {t(item.descKey, { ns: 'navigation' })}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
