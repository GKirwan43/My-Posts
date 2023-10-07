"use client";

import { Box, Button, Divider, Group, Menu, Text } from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <header>
      <Box my="lg" px="lg">
        <Group justify="space-between">
          <Text size="md" fw={700} component={Link} href="/">
            My Posts
          </Text>
          <Group visibleFrom="sm" gap="xs">
            <Button component={Link} variant="default" href="/login">
              Login
            </Button>
            <Button component={Link} href="/register">
              Create Account
            </Button>
          </Group>
          <Menu>
            <Menu.Target>
              <Burger hiddenFrom="sm" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={toggle} component={Link} href="/login">
                Login
              </Menu.Item>
              <Menu.Item onClick={toggle} component={Link} href="/register">
                Create Account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>
      <Divider my="sm" />
    </header>
  );
};

export default Navbar;
