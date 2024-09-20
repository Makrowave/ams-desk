'use client'
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function PrivateRoute({children}) {
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if(!auth) {
      router.push('/login');
    }
  })

  if(!auth) {
    return null;
  }
  return (
    <>
    {children}
    </>
  )
}