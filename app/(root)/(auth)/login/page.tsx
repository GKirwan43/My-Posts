"use client";

import { Button, Card, Center, Divider, Group, PasswordInput, Stack, TextInput, Title, rem } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import signIn from "@/lib/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { links } from "@/utils/contants";

const Register = () => {
  // Hooks
  const { height } = useViewportSize();
  const [visible, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const form = useForm({
    validate: {
      email: hasLength({ min: 1 }, "Email required."),
      password: hasLength({ min: 1 }, "Password required."),
    },
  });

  // Icons
  const email_icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

  // Functions

  const handleSubmit = async (values: any) => {
    const { error }: any = await signIn(values.email, values.password);

    if (error) {
      console.log(error.code);
      if (error.code === ("auth/invalid-login-credentials" || "auth/invalid-email")) {
        form.setErrors({ email: " ", password: "Email or password Incorrect." });
      } else if (error.code === "auth/too-many-requests") {
        form.setErrors({ email: " ", password: "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later." });
      }

      return console.log(error);
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
            <TextInput label="Email" leftSection={email_icon} placeholder="Your email here" withAsterisk {...form.getInputProps("email")} />
            <PasswordInput label="Password" placeholder="Your password here" visible={visible} onVisibilityChange={toggle} withAsterisk {...form.getInputProps("password")} />
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
