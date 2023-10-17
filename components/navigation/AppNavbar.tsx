"use client";

const { version } = require("@/package.json");
import signOut from "@/lib/firebase/auth/signout";
import { links } from "@/utils/contants";
import { Box, Divider, NavLink, Stack, Text } from "@mantine/core";
import { IconBook2, IconChevronRight, IconDoorEnter, IconHome2, IconPlus, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Settings from "../modals/Settings";
import { useDisclosure } from "@mantine/hooks";
import CreateJournal from "../modals/CreateJournal";

const AppNavbar = () => {
  const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
  const [createJournalOpened, { open: openCreateJournal, close: closeCreateJournal }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <Stack justify="space-between" h="100%">
      <Box px="md" py="sm">
        <NavLink component={Link} href={links.dashboard} label="Dashboard" leftSection={<IconHome2 />} active={pathname.includes("dashboard")} />
        <NavLink label="Journals" leftSection={<IconBook2 />} rightSection={<IconChevronRight />} defaultOpened>
          <NavLink label="Create new" leftSection={<IconPlus />} active variant="subtle" onClick={() => openCreateJournal()} />
          <CreateJournal opened={createJournalOpened} close={closeCreateJournal} />
        </NavLink>
      </Box>
      <Box px="md" py="sm">
        <Box my="md">
          <NavLink label="Settings" leftSection={<IconSettings />} onClick={() => openSettings()} />
          <Settings opened={settingsOpened} close={closeSettings} />
          <NavLink label="Logout" leftSection={<IconDoorEnter />} onClick={signOut} />
        </Box>
        <Divider />
        <Text size="sm" m="md">
          Version: {version}
        </Text>
      </Box>
    </Stack>
  );
};

export default AppNavbar;
