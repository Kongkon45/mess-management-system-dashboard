import React from 'react';
import Link from 'next/link';
import { sidebarMenu } from './SidebarData';
import { usePathname } from 'next/navigation';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarPrimitive collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:px-2">
        <p className="truncate px-2 text-lg font-semibold tracking-tight text-sidebar-foreground group-data-[collapsible=icon]:hidden">
          Mess Manager
        </p>
      </SidebarHeader>

      <SidebarContent>
        {sidebarMenu.map((section) => (
          <SidebarGroup key={section.items[0]?.href}>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive}
                        tooltip={item.title}
                        className={
                          isActive
                            ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                            : undefined
                        }
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </SidebarPrimitive>
  );
}

