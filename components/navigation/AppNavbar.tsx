"use client";

const { version } = require("@/package.json");
import { links } from "@/lib/utils/contants";
import { Box, Divider, NavLink, ScrollArea, Stack, Text } from "@mantine/core";
import {
  IconBook2,
  IconChevronRight,
  IconDoorEnter,
  IconHome2,
  IconPlus,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import signOut from "@/lib/utils/services/auth/signout";
import {
  openCreateJournalModal,
  openSettingsModal,
} from "@/lib/mantine/modals";
import { useJournalContext } from "@/context/JournalContextProvider";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

const AppNavbar = () => {
  const pathname = usePathname();
  const { journals }: any = useJournalContext();
  const { ref: stackRef, height: stackHeight } = useElementSize();
  const { ref: bottomLinksRef, height: bottomLinksHeight } = useElementSize();
  return (
    <>
      <Stack justify="space-between" h="100%" ref={stackRef}>
        <ScrollArea h={stackHeight - bottomLinksHeight}>
          <Box px="md" py="sm">
            <NavLink
              component={Link}
              href={links.dashboard}
              label="Dashboard"
              leftSection={<IconHome2 />}
              active={pathname.includes("dashboard")}
              variant="filled"
            />
            <NavLink
              label="Journals"
              leftSection={<IconBook2 />}
              rightSection={<IconChevronRight />}
              variant="filled"
              active={pathname.includes("journal")}
              defaultOpened
            >
              <NavLink
                label="Create new"
                leftSection={<IconPlus />}
                active
                variant="subtle"
                onClick={openCreateJournalModal}
              />
              {journals.map((journal: any) => (
                <NavLink
                  component={Link}
                  label={journal.title}
                  href={`/journal/${journal.id}`}
                  key={journal.id}
                  active={pathname.includes(`journal/${journal.id}`)}
                />
              ))}
            </NavLink>
          </Box>
        </ScrollArea>
        <Box px="md" py="sm" ref={bottomLinksRef}>
          <Box my="md">
            <NavLink
              label="Settings"
              leftSection={<IconSettings />}
              onClick={openSettingsModal}
            />
            <NavLink
              label="Logout"
              leftSection={<IconDoorEnter />}
              onClick={signOut}
            />
          </Box>
          <Divider />
          <Text size="sm" m="md">
            Version: {version}
          </Text>
        </Box>
      </Stack>
    </>
  );
};

export default AppNavbar;
