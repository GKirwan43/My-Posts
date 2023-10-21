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
import { useForm, hasLength, isEmail, matchesField } from "@mantine/form";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import signUp from "@/lib/utils/services/auth/signup";

const Register = () => {
  // Hooks
  const { height } = useViewportSize();
  const [passwordVisible, { toggle: togglePassword }] = useDisclosure(false);
  const [loadingVisible, { open: setLoading, close: setNotLoading }] =
    useDisclosure(false);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      username: hasLength(
        { min: 5, max: 15 },
        "Username must be 5-15 characters long."
      ),
      email: isEmail("Invalid Email."),
      password: hasLength(
        { min: 6, max: 25 },
        "Password must be 6-25 characters long."
      ),
      confirmPassword: matchesField("password", "Passwords do not match."),
    },
  });

  // Icons
  const email_icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

  // Functions

  const handleSubmit = async (values: any) => {
    setLoading();

    const res = await signUp(values.username, values.email, values.password);
    const error = res?.error;
    const errorMessages = res?.errorMessages;

    if (error) {
      form.setErrors({
        username: " ",
        email: " ",
        password: " ",
        confirmPassword: error,
      });
    }

    if (errorMessages) {
      form.setErrors({
        username: errorMessages.username,
        email: errorMessages.email,
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
            Create Account
          </Title>
          <Divider my="sm" />
          <form
            onSubmit={form.onSubmit((values) => {
              handleSubmit(values);
            })}
          >
            <Stack gap="sm">
              <TextInput
                label="Username"
                placeholder="Your username here"
                withAsterisk
                {...form.getInputProps("username")}
              />
              <TextInput
                label="Email"
                leftSection={email_icon}
                placeholder="Your email here"
                withAsterisk
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password here"
                visible={passwordVisible}
                onVisibilityChange={togglePassword}
                withAsterisk
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Repeat your password here"
                visible={passwordVisible}
                onVisibilityChange={togglePassword}
                withAsterisk
                {...form.getInputProps("confirmPassword")}
              />
            </Stack>
            <Group justify="center" mt={20}>
              <Button type="submit">Create Account</Button>
            </Group>
          </form>
        </Card>
      </Center>
    </Box>
  );
};

export default Register;
