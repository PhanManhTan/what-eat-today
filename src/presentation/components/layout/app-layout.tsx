import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-6xl flex-1 px-4 py-6 sm:px-6 md:py-8">
        <Outlet />
      </main>
      <footer className="border-t bg-muted/30 py-6 text-center text-xs text-muted-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 sm:flex-row">
          <p>
            <span className="font-semibold text-foreground">what-eat-today</span> — Manual &
            Local-First Meal Planning.
          </p>
          <p className="flex items-center gap-2">
            <span>Deterministic Math</span>
            <span>•</span>
            <span>Privacy-First (No tracking)</span>
            <span>•</span>
            <span>100% Free & Open-Source</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
