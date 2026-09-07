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
    title: "My Meals",
    description: "View your meal schedule and selections",
  },

  "/users": {
    title: "Users",
    description: "Manage and view all users",
  },

  "/settings": {
    title: "Settings",
    description: "Manage your account settings and preferences",
  },
  "/member-management": { title: "Member Management", description: "Manage all mess members" },
  "/meal-management": { title: "Meal Management", description: "Manage meal plans and availability" },
  "/market-management": { title: "Market Management", description: "Track market purchases and costs" },
  "/utility-management": { title: "Utility Management", description: "Track utility bills and payments" },
  "/monthly-selection": { title: "Monthly Selection", description: "Review monthly meal selections" },
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
