'use client';

import React from 'react';
import Sidebar from './_dashboard/Sidebar';
import Header from './_dashboard/Header';
import { ThemeProvider } from './_dashboard/ThemeProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <div className="border-b border-border bg-background px-6 py-4 shadow-sm">
            <Header />
          </div>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
