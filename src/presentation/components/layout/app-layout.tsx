import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './header';
import { BottomNav } from './bottom-nav';

export const AppLayout: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="container mx-auto max-w-5xl flex-1 px-4 py-4 sm:px-6 md:py-6 pb-24 md:pb-12">
        <Outlet />
      </main>
      <BottomNav />
      <footer className="hidden border-t bg-card/50 py-6 text-center text-xs text-muted-foreground md:block">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 sm:flex-row">
          <p>
            <span className="font-bold text-foreground">what-eat-today</span> (Hôm Nay Ăn Gì) —{' '}
            {t('appTagline')}
          </p>
          <p className="flex items-center gap-2">
            <span>{t('freeAndOpenSource')}</span>
            <span>•</span>
            <span>{t('localFirst')}</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
