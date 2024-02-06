"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { recoverUserInformation, signnInRequest } from "@/service/auth";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import axios from "axios";

type AuthProviderProp = {
  children: ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProp) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "marvelauth.token": token } = parseCookies();

    if (!token) {
      setUser(null);
      router.push("/");
    } else {
      recoverUserInformation().then((response) => setUser(response.user));
    }
  }, []);

  function signOut() {
    try {
      destroyCookie(undefined, "marvelauth.token");

      setUser(null);

      router.push("/");
    } catch (error) {
      console.log("erro ao deslogar: ", error);
    }
  }

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signnInRequest({ email, password });

    setCookie(undefined, "marvelauth.token", token, { maxAge: 60 * 60 * 1 });

    axios.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    router.push("/selectagent");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
