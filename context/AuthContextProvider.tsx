"use client";

import { onAuthStateChanged } from "firebase/auth";
import auth from "@/lib/firebase/config";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{loading ? <div>Loading...</div> : children}</AuthContext.Provider>;
};
