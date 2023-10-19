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
import { useForm, hasLength, isEmail, matchesField } from "@mantine/form";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { links } from "@/lib/utils/contants";
import signUp from "@/lib/utils/services/auth/signup";

const Register = () => {
  // Hooks
  const { height } = useViewportSize();
  const [visible, { toggle }] = useDisclosure(false);
  const router = useRouter();
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
    const res = await signUp(values.username, values.email, values.password);
    const error = res?.error;
    const errorMessages = res?.errorMessages;

    if (error) {
      return console.log("An error occured"); // Remove when error notification are implemented
    }

    if (errorMessages) {
      form.setErrors({
        username: errorMessages.username,
        email: errorMessages.email,
      });

      return;
    }
  };

  return (
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
              visible={visible}
              onVisibilityChange={toggle}
              withAsterisk
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Repeat your password here"
              visible={visible}
              onVisibilityChange={toggle}
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
  );
};

export default Register;
