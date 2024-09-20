import AuthContext from "@/components/providers/auth_provider";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext);
}