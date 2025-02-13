import AuthContext from "@/components/providers/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext);
}
