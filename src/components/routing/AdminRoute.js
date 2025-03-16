"use client";
import useAuth from "@/hooks/useAuth";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AdminRoute({children}) {
  const {user, admin, setPrevRoute} = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!user.token) {
      setPrevRoute(pathname);
      router.push("/login");
    }
    if (!admin.token) {
      setPrevRoute(pathname);
      router.push("/adminlogin");
    }
  });

  if (!admin.token) {
    return null;
  }
  return <>{children}</>;
}
