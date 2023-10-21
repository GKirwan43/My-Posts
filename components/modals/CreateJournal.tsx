"use client";

import { createJournal } from "@/lib/utils/services/journal/createJournal";
import { Modal, TextInput, Button, Stack, Flex, Textarea } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";

interface props {
  opened: boolean;
  close: () => void;
}

const CreateJournal = ({ opened, close }: props) => {
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

  const handleSubmit = (values: any) => {
    createJournal(values.title, values.description);

    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Create Journal" centered>
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
    </Modal>
  );
};

export default CreateJournal;
