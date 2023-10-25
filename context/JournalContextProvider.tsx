"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getJournals } from "@/lib/utils/services/journal/getJournals";
import { useAuthContext } from "./AuthContextProvider";

export const JournalContext = createContext({});

export const useJournalContext = () => useContext(JournalContext);

export const JournalContextProvider = ({ children }: any) => {
  const { user }: any = useAuthContext();
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    if (user) {
      refreshJournals();
    } else {
      setJournals([]);
    }
  }, [user]);

  const refreshJournals = async () => {
    setJournals(await getJournals());
  };

  return (
    <JournalContext.Provider value={{ journals, refreshJournals }}>
      {children}
    </JournalContext.Provider>
  );
};
