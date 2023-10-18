"use client";

import { links } from "@/lib/utils/contants";
import { Button, Center, Container, Stack, Text, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Link from "next/link";

export default function Home() {
  const { height, width } = useViewportSize();

  return (
    <section>
      <Center h={height - 100}>
        <Stack align="center">
          <Title order={1} ta="center">
            Welcome to My Posts!
          </Title>
          <Title order={2} ta="center">
            The self journal posting application.
          </Title>
          <Button component={Link} href={links.signup}>
            Create Account
          </Button>
        </Stack>
      </Center>
    </section>
  );
}
