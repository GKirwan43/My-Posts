"use client";

import {
  Switch,
  Button,
  Stack,
  Flex,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface Settings {
  darkMode: boolean;
}

const Settings = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const form = useForm({
    initialValues: {
      darkMode: colorScheme === "dark",
    },
  });

  const handleSubmit = (values: Settings) => {
    const selectedColorScheme = values.darkMode === true ? "dark" : "light";

    if (selectedColorScheme !== colorScheme) {
      setColorScheme(selectedColorScheme);
    }

    close();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack align="flex-start">
        <Switch
          label="Dark mode"
          {...form.getInputProps("darkMode", { type: "checkbox" })}
        />
        <Flex justify="flex-end" w="100%">
          <Button type="submit">Save</Button>
        </Flex>
      </Stack>
    </form>
  );
};

export default Settings;
