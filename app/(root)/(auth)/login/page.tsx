"use client";

import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import signIn from "@/lib/utils/services/auth/signin";

const Register = () => {
  // Hooks
  const { height } = useViewportSize();
  const [passwordVisible, { toggle: togglePassword }] = useDisclosure(false);
  const [loadingVisible, { open: setLoading, close: setNotLoading }] =
    useDisclosure(false);
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
    setLoading();

    const res = await signIn(values.username, values.password);
    const error = res?.error;
    const errorMessages = res?.errorMessages;

    if (error) {
      form.setErrors({
        username: " ",
        password: error,
      });
    }

    if (errorMessages) {
      form.setErrors({
        username: " ",
        password: errorMessages.password,
      });
    }

    setNotLoading();
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loadingVisible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
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
                visible={passwordVisible}
                onVisibilityChange={togglePassword}
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
    </Box>
  );
};

export default Register;
