"use client";

import { Modal, TextInput, Button, Stack, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface props {
  opened: boolean;
  close: () => void;
}

const CreateJournal = ({ opened, close }: props) => {
  const form = useForm({});

  const handleSubmit = (values: any) => {
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
          />
          <Textarea
            label="Description"
            description="Max description length of 250 characters."
            placeholder="Your journals description here."
            minRows={3}
            maxLength={250}
            autosize
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
