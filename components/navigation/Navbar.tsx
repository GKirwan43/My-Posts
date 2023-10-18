import { Box, Button, Divider, Group, Menu, Text } from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { links } from "@/lib/utils/contants";
import Logo from "../Logo";

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <header>
      <Box my="lg" px="lg">
        <Group justify="space-between">
          <Logo href={links.home} />
          <Group visibleFrom="sm" gap="xs">
            <Button component={Link} variant="default" href={links.login}>
              Login
            </Button>
            <Button component={Link} href={links.signup}>
              Create Account
            </Button>
          </Group>
          <Menu>
            <Menu.Target>
              <Burger
                hiddenFrom="sm"
                opened={opened}
                onClick={toggle}
                aria-label="Toggle navigation"
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={toggle} component={Link} href={links.login}>
                Login
              </Menu.Item>
              <Menu.Item onClick={toggle} component={Link} href={links.signup}>
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
