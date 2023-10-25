"use client";

import Header from "@/components/Header";
import AppNavbar from "@/components/navigation/AppNavbar";
import { useAuthContext } from "@/context/AuthContextProvider";
import { JournalContextProvider } from "@/context/JournalContextProvider";
import { AppShell, MantineProvider } from "@mantine/core";
import { theme } from "@/lib/mantine/theme";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserContextProvider } from "@/context/UserContextProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user }: any = useAuthContext();
  const router = useRouter();
  const [navOpened, { toggle: toggleNav }] = useDisclosure();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <MantineProvider theme={theme}>
      <UserContextProvider>
        <JournalContextProvider>
          <Notifications />
          <ModalsProvider>
            <AppShell
              padding="md"
              header={{ height: 60 }}
              navbar={{
                width: { sm: 250, lg: 300 },
                breakpoint: "sm",
                collapsed: { mobile: !navOpened },
              }}
            >
              <AppShell.Header>
                <Header isNavOpen={navOpened} toggleNav={toggleNav} />
              </AppShell.Header>
              <AppShell.Navbar>
                <AppNavbar />
              </AppShell.Navbar>
              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </ModalsProvider>
        </JournalContextProvider>
      </UserContextProvider>
    </MantineProvider>
  );
}
