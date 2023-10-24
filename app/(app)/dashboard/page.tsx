"use client";

import { useAuthContext } from "@/context/AuthContextProvider";
import signOut from "@/lib/firebase/auth/signout";
import { Journal } from "@/lib/utils/interfaces";
import { getJournals } from "@/lib/utils/services/journal/getJournals";
import { Text, Title } from "@mantine/core";
import { useState } from "react";

const User = () => {
  const { user }: any = useAuthContext();

  return (
    user && (
      <>
        <Title>Dashboard</Title>
        <Text>Welcome back, {user.displayName}</Text>
      </>
    )
  );
};

export default User;
