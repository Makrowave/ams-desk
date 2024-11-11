"use client";
import useAuth from "@/hooks/use_auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRoute({ children }) {
  const { adminAccessToken, setPrevRoute } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!adminAccessToken) {
      setPrevRoute(pathname);
      router.push("/admin/login");
    }
  });

  if (!adminAccessToken) {
    return null;
  }
  return <>{children}</>;
}
