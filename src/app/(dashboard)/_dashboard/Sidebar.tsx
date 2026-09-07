'use client';

import React from 'react';
import Link from 'next/link';
import { adminSidebarMenu, memberSidebarMenu, settingsItem } from './SidebarData';
import { usePathname } from 'next/navigation';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { useRole } from './roles/RoleContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useRole();
  const sidebarMenu = role === 'admin' ? adminSidebarMenu : memberSidebarMenu;

  return (
    <SidebarPrimitive collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
  <div className="flex items-center justify-center">
    <Image
      src="/images/logo.png"
      alt="logo"
      width={80}
      height={80}
      className="object-contain"
    />
  </div>
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href={settingsItem.href} />}
              isActive={pathname === settingsItem.href}
              tooltip={settingsItem.title}
            >
              <settingsItem.icon />
              <span>{settingsItem.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}

