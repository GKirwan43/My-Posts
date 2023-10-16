"use client";

import Header from "@/components/Header";
import { useAuthContext } from "@/context/AuthContextProvider";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user }: any = useAuthContext();
  const router = useRouter();
  const [navOpened, { toggle: toggleNav }] = useDisclosure();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <AppShell padding="md" header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !navOpened } }}>
      <AppShell.Header>
        <Header isNavOpen={navOpened} toggleNav={toggleNav} />
      </AppShell.Header>
      <AppShell.Navbar></AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
