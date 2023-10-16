import { Box, Burger, Button, Center, Flex, Group } from "@mantine/core";
import Logo from "./Logo";
import signOut from "@/lib/firebase/auth/signout";
import { links } from "@/utils/contants";

interface props {
  isNavOpen: boolean;
  toggleNav: () => {};
}

const Header = ({ isNavOpen, toggleNav }: props) => {
  return (
    <Group justify="space-between" h="100%" px="md">
      <Group>
        <Burger hiddenFrom="sm" opened={isNavOpen} onClick={toggleNav} />
        <Logo href={links.dashboard} />
      </Group>
      <Button variant="default" onClick={signOut}>
        Logout
      </Button>
    </Group>
  );
};

export default Header;
