"use client";
import useAuth from "@/hooks/use_auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { accessToken, setPrevRoute } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!accessToken) {
      setPrevRoute(pathname);
      router.push("/login");
    }
  });

  if (!accessToken) {
    return null;
  }
  return <>{children}</>;
}
