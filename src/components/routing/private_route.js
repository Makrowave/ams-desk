"use client";
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { accessToken, refresh } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  });

  if (!accessToken) {
    return null;
  }
  return <>{children}</>;
}
