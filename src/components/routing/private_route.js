"use client";
import useAuth from "@/hooks/use_auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children, login }) {
  const { user, setPrevRoute, logoutAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!user.token) {
      setPrevRoute(pathname);
      router.push("/login");
    }
    if (!login) {
      logoutAdmin(false);
    }
  }, [user]);

  if (!user.token) {
    return null;
  }
  return <>{children}</>;
}
