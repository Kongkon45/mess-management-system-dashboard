"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type DashboardRole = "admin" | "user";

type RoleContextValue = {
  role: DashboardRole;
  setRole: (role: DashboardRole) => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<DashboardRole>("user");

  useEffect(() => {
    if (pathname === "/dashboard") {
      router.replace("/user");
      return;
    }

    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      setRole("admin");
      return;
    }

    if (pathname === "/user" || pathname.startsWith("/user/")) {
      setRole("user");
    }
  }, [pathname, router]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used inside RoleProvider");
  }

  return context;
}
