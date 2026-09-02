import React from 'react';
import Link from 'next/link';
import { sidebarMenu } from './SidebarData';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
   
  
  return (
    <aside className="h-screen w-[260px] border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm">
      <div className="flex h-full flex-col gap-5 p-4">
        {/* Logo/Branding */}
        <div className="px-2 pb-2">
          <p className="text-lg font-semibold tracking-tight text-sidebar-foreground">
            Mess Manager
          </p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {sidebarMenu.map((section, index) =>
            section.items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Icon size={18} className="shrink-0" />
                  <span>{item.title}</span>
                </Link>
              );
            })
          )}
        </nav>
      </div>
    </aside>
  );
}

