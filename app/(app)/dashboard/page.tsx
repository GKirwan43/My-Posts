"use client";

import { useUserContext } from "@/context/UserContextProvider";
import { Text, Title } from "@mantine/core";

const User = () => {
  const { userData }: any = useUserContext();

  return userData ? (
    <>
      <Title>Dashboard</Title>
      <Text>Welcome back, {userData?.username}</Text>
      <Text>Email: {userData?.email}</Text>
      <Text>Uid: {userData?.uid}</Text>
    </>
  ) : (
    <Text>Loading...</Text>
  );
};

export default User;
