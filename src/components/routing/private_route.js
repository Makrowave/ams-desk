"use client";
import useAuth from "@/hooks/use_auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children, login }) {
  const { accessToken, setPrevRoute, logoutAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!accessToken) {
      setPrevRoute(pathname);
      router.push("/login");
    }
    // Checked for admin token before, but it won't work on refresh or manually entering link.
    if (!login) {
      logoutAdmin(false);
    }
  });

  if (!accessToken) {
    return null;
  }
  return <>{children}</>;
}
