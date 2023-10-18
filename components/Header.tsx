import { Box, Burger, Button, Center, Flex, Group } from "@mantine/core";
import Logo from "./Logo";
import signOut from "@/lib/firebase/auth/signout";
import { links } from "@/lib/utils/contants";

interface props {
  isNavOpen: boolean;
  toggleNav: () => void;
}

const Header = ({ isNavOpen, toggleNav }: props) => {
  return (
    <Group justify="space-between" h="100%" px="md">
      <Group>
        <Burger hiddenFrom="sm" opened={isNavOpen} onClick={toggleNav} />
        <Logo href={links.dashboard} />
      </Group>
    </Group>
  );
};

export default Header;
