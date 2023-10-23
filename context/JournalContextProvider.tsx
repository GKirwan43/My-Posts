"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Journal } from "@/lib/utils/interfaces";
import { getJournals } from "@/lib/utils/services/journal/getJournals";

export const JournalContext = createContext({});

export const useJournalContext = () => useContext(JournalContext);

export const JournalContextProvider = ({ children }: any) => {
  const [journals, setJournals] = useState<Journal[]>([]);

  useEffect(() => {
    refreshJournals();
  });

  const refreshJournals = async () => {
    setJournals(await getJournals());
  };

  return (
    <JournalContext.Provider value={{ journals, refreshJournals }}>
      {children}
    </JournalContext.Provider>
  );
};
