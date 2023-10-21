"use client";

import { useAuthContext } from "@/context/AuthContextProvider";
import signOut from "@/lib/firebase/auth/signout";
import { test } from "@/lib/utils/services/test";

const User = () => {
  const { user }: any = useAuthContext();

  return (
    user && (
      <>
        <p>Hello, {user.displayName}</p>
        <button onClick={signOut}>Sign out</button>
        <br />
        <button onClick={test}>Test token</button>
      </>
    )
  );
};

export default User;
