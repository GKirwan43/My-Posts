"use client";

import { useAuthContext } from "@/context/AuthContextProvider";
import signOut from "@/lib/firebase/auth/signout";
import { Journal } from "@/lib/utils/interfaces";
import { getJournals } from "@/lib/utils/services/journal/getJournals";
import { test } from "@/lib/utils/services/test";
import { useState } from "react";

const User = () => {
  const { user }: any = useAuthContext();
  const [journals, setJournals] = useState<Journal[]>([]);

  const handleGetJournals = async () => {
    const res = await getJournals();
    setJournals(res);
  };

  return (
    user && (
      <>
        <p>Hello, {user.displayName}</p>
        <button onClick={signOut}>Sign out</button>
        <br />
        <button onClick={test}>Test token</button>
        <br />
        <button onClick={handleGetJournals}>Get Journals</button>
        {journals.map((journal) => (
          <div key={journal.id}>
            <h1>{journal.title}:</h1>
            <p>{journal.description}</p>
          </div>
        ))}
      </>
    )
  );
};

export default User;
