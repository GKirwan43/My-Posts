"use client";

import { useJournalContext } from "@/context/JournalContextProvider";
import { createJournal } from "@/lib/utils/services/journal/createJournal";
import {
  TextInput,
  Button,
  Stack,
  Flex,
  Textarea,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

const CreateJournal = () => {
  const [loadingVisible, { open: setLoading, close: setNotLoading }] =
    useDisclosure(false);
  const { refreshJournals }: any = useJournalContext();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: hasLength(
        { min: 1, max: 50 },
        "Title must be 1-50 characters long."
      ),
      description: hasLength(
        { max: 250 },
        "Description can not be longer than 250 characters."
      ),
    },
  });

  const handleSubmit = async (values: any) => {
    setLoading();

    const res = await createJournal(values.title, values.description);
    await refreshJournals();

    setNotLoading();
  };

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={loadingVisible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack align="">
            <TextInput
              label="Title"
              description="Max title length of 50 characters."
              placeholder="Your journals title here."
              maxLength={50}
              withAsterisk
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Description"
              description="Max description length of 250 characters."
              placeholder="Your journals description here."
              minRows={3}
              maxLength={250}
              autosize
              {...form.getInputProps("description")}
            />
            <Flex justify="flex-end" w="100%">
              <Button type="submit">Create</Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default CreateJournal;
