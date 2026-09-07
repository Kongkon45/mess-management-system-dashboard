'use client';

import React from 'react';
import Sidebar from './_dashboard/Sidebar';
import Header from './_dashboard/Header';
import { ThemeProvider } from './_dashboard/ThemeProvider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { RoleProvider } from './_dashboard/roles/RoleContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RoleProvider>
        <SidebarProvider className="h-svh overflow-hidden">
          <Sidebar />
          <SidebarInset className="min-w-0 overflow-hidden bg-background">
            <div className="border-b border-border bg-background px-3 py-4 shadow-sm">
              <Header />
            </div>
            <main className="min-w-0 flex-1 overflow-auto p-4">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}
