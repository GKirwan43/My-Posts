"use client";

import { useAuthContext } from "@/context/AuthContextProvider";
import signOut from "@/lib/firebase/auth/signout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const User = () => {
  const { user }: any = useAuthContext();

  return (
    user && (
      <>
        <p>Hello, {user.displayName}</p>
        <button onClick={signOut}>Sign out</button>
      </>
    )
  );
};

export default User;
