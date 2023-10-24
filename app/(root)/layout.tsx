"use client";

import Navbar from "@/components/navigation/Navbar";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/lib/mantine/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user }: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <MantineProvider theme={theme}>
      <Navbar />
      <main>{children}</main>
    </MantineProvider>
  );
}
