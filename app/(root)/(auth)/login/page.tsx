"use client";

import {
  Button,
  Card,
  Center,
  Divider,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import signIn from "@/lib/utils/services/auth/signin";
import { useRouter } from "next/navigation";
import { links } from "@/lib/utils/contants";

const Register = () => {
  // Hooks
  const { height } = useViewportSize();
  const [visible, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: hasLength({ min: 1 }, "Username Email required."),
      password: hasLength({ min: 1 }, "Password required."),
    },
  });

  // Functions
  const handleSubmit = async (values: any) => {
    const res = await signIn(values.username, values.password);
    const error = res?.error;
    const errorMessages = res?.errorMessages;

    if (error) {
      return console.log(error);
    }

    if (errorMessages) {
      form.setErrors({
        username: " ",
        password: errorMessages.password,
      });

      return;
    }

    return router.push(links.dashboard);
  };

  return (
    <Center h={height - 100}>
      <Card shadow="sm" padding="lg" radius="md" w={rem(300)} withBorder>
        <Title size="h3" ta="center">
          Login
        </Title>
        <Divider my="sm" />
        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values);
          })}
        >
          <Stack gap="sm">
            <TextInput
              label="Username or Email"
              placeholder="Your username or email here"
              withAsterisk
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password here"
              visible={visible}
              onVisibilityChange={toggle}
              withAsterisk
              {...form.getInputProps("password")}
            />
          </Stack>
          <Group justify="center" mt={20}>
            <Button type="submit">Login</Button>
          </Group>
        </form>
      </Card>
    </Center>
  );
};

export default Register;
