"use client";

import {
  Modal,
  Switch,
  Button,
  Stack,
  Flex,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface props {
  opened: boolean;
  close: () => void;
}

interface Settings {
  darkMode: boolean;
}

const Settings = ({ opened, close }: props) => {
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
    <Modal opened={opened} onClose={close} title="Settings" centered>
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
    </Modal>
  );
};

export default Settings;
