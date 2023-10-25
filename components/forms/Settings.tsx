"use client";

import { useUserContext } from "@/context/UserContextProvider";
import { updateUser } from "@/lib/utils/services/user/updateUser";
import {
  Switch,
  Button,
  Stack,
  Flex,
  useMantineColorScheme,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";

interface Settings {
  darkMode: boolean;
}

const Settings = () => {
  const [loadingVisible, { open: setLoading, close: setNotLoading }] =
    useDisclosure(false);
  const { userData, refreshUserData }: any = useUserContext();
  const userSettings = userData.settings;

  const form = useForm({
    initialValues: {
      darkMode: userSettings.darkMode,
    },
  });

  const handleSubmit = async (values: Settings) => {
    const updatedUser = {
      settings: {
        darkMode: values.darkMode,
      },
    };

    setLoading();

    const res = await updateUser(updatedUser);
    await refreshUserData();

    setNotLoading();

    if (!res.error) {
      modals.close("settings");
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loadingVisible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
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
    </Box>
  );
};

export default Settings;
