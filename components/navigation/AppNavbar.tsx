"use client";

const { version } = require("@/package.json");
import signOut from "@/lib/firebase/auth/signout";
import { Box, Divider, NavLink, Stack, Text } from "@mantine/core";
import { IconBook2, IconChevronRight, IconDoorEnter, IconHome2, IconPlus, IconSettings } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const AppNavbar = () => {
  const pathname = usePathname();

  return (
    <Stack justify="space-between" h="100%">
      <Box px="md" py="sm">
        <NavLink label="Dashboard" leftSection={<IconHome2 />} active={pathname.includes("dashboard")} />
        <NavLink label="Journals" leftSection={<IconBook2 />} rightSection={<IconChevronRight />} defaultOpened>
          <NavLink label="Create new" leftSection={<IconPlus />} active variant="subtle" />
        </NavLink>
      </Box>
      <Box px="md" py="sm">
        <Box my="md">
          <NavLink label="Settings" leftSection={<IconSettings />} onClick={() => {}} />
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
