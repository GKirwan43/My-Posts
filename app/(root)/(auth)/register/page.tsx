"use client";

import { Card, Center, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

const Register = () => {
  const { height } = useViewportSize();

  return (
    <Center h={height - 100}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title size="h3">Create Account</Title>
      </Card>
    </Center>
  );
};

export default Register;
