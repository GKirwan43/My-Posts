"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContextProvider";
import { getUserData } from "@/lib/utils/services/user/getUserData";
import { useMantineColorScheme } from "@mantine/core";

export interface User {}

export const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: any) => {
  const { user }: any = useAuthContext();
  const [userData, setUserData] = useState(null);
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (user) {
      refreshUserData();
    } else {
      setColorScheme("light");
      setUserData(null);
    }
  }, [user]);

  const refreshUserData = async () => {
    const userData = await getUserData();

    setColorScheme(userData.settings.darkMode ? "dark" : "light");
    setUserData(await getUserData());
  };

  return (
    <UserContext.Provider value={{ userData, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};
