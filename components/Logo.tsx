import { links } from "@/utils/contants";
import { Text } from "@mantine/core";
import Link from "next/link";

interface props {
  href: string;
}

const Logo = ({ href }: props) => {
  return (
    <Text size="md" fw={700} component={Link} href={href}>
      My Posts
    </Text>
  );
};

export default Logo;
