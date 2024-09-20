'use client'
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState('');
  const _loginUrl = '/Auth/Login';
  const router = useRouter();

  async function login(username, password) {
    try {
      const response = await axios.post(_loginUrl,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = response.data;
      if(!!data) {
        setAuth(data);
        router.push('/rowery');
      } else {
        throw new Error(data);
      }
    }
    catch(err) {
      //change for better error handling
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;