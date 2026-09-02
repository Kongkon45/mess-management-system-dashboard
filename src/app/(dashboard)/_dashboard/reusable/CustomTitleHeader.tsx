"use client";

import { usePathname } from "next/navigation";

const pageInfo: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Overview of your meal management system",
  },

  "/meals": {
    title: "Meal Management",
    description: "Manage and organize your meals",
  },

  "/users": {
    title: "Users",
    description: "Manage and view all users",
  },

  "/settings": {
    title: "Settings",
    description: "Manage your account settings and preferences",
  },
};

export default function PageHeader() {
  const pathname = usePathname();

  const currentPage = pageInfo[pathname] ?? {
    title: "Dashboard",
    description: "Welcome to your dashboard",
  };

  return (
    <div className="min-w-0 space-y-1">
      <h1 className="text-xl font-semibold text-headerColor">
        {currentPage.title}
      </h1>

      <p className="text-sm text-muted-foreground">
        {currentPage.description}
      </p>
    </div>
  );
}
