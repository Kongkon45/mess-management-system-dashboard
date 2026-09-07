"use client";

import { CalendarDays, ReceiptText, Users, Utensils } from "lucide-react";
import { useRole } from "./roles/RoleContext";

const adminStats = [
  { label: "Total Members", value: "32", icon: Users },
  { label: "Today's Meals", value: "64", icon: Utensils },
  { label: "Market Cost", value: "৳5,500", icon: ReceiptText },
  { label: "Pending Selections", value: "8", icon: CalendarDays },
];

const memberStats = [
  { label: "Meals This Month", value: "48", icon: Utensils },
  { label: "My Meal Balance", value: "৳1,240", icon: ReceiptText },
  { label: "Next Meal", value: "Dinner", icon: CalendarDays },
  { label: "Selection Status", value: "Confirmed", icon: Users },
];

export default function DashboardOverview() {
  const { role } = useRole();
  const stats = role === "admin" ? adminStats : memberStats;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {role === "admin" ? "Admin Overview" : "User Overview"}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {role === "admin" ? "Monitor your mess operations in one place." : "Your meals, balance and monthly selections at a glance."}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon className="size-5 text-primary" />
            </div>
            <p className="mt-3 text-2xl font-bold">{value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
