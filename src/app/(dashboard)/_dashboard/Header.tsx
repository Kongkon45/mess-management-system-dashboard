'use client';

import React from 'react';
import { Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import PageHeader from './reusable/CustomTitleHeader';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <header className="flex w-full min-w-0 items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger />
        <PageHeader />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Sun className="size-4 text-muted-foreground" aria-hidden="true" />
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          aria-label="Toggle dark mode"
        />
        <Moon className="size-4 text-muted-foreground" aria-hidden="true" />
        <User className="ml-1 size-5" />
      </div>
    </header>
  );
}
