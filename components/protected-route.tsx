// components/ProtectedRoute.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/utils";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = isAdmin();
      if (!adminStatus) {
        router.push("/admin/login");
      }
    };
    checkAdmin();
  }, []);

  return <>{children}</>;
};
