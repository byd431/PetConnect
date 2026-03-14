import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean; // For future use if we want a dashboard layout
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-app)]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
