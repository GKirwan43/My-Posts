"use client";

const { version } = require("@/package.json");
import { links } from "@/lib/utils/contants";
import { Box, Divider, NavLink, Stack, Text } from "@mantine/core";
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

const AppNavbar = () => {
  const pathname = usePathname();

  return (
    <Stack justify="space-between" h="100%">
      <Box px="md" py="sm">
        <NavLink
          component={Link}
          href={links.dashboard}
          label="Dashboard"
          leftSection={<IconHome2 />}
          active={pathname.includes("dashboard")}
        />
        <NavLink
          label="Journals"
          leftSection={<IconBook2 />}
          rightSection={<IconChevronRight />}
          defaultOpened
        >
          <NavLink
            label="Create new"
            leftSection={<IconPlus />}
            active
            variant="subtle"
            onClick={openCreateJournalModal}
          />
        </NavLink>
      </Box>
      <Box px="md" py="sm">
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
  );
};

export default AppNavbar;
