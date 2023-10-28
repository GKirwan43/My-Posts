"use client";

import TextEditor from "@/components/inputs/TextEditor";
import { useJournalContext } from "@/context/JournalContextProvider";
import { createJournalPost } from "@/lib/utils/services/journal/posts/createJournalPost";
import { getJournalPosts } from "@/lib/utils/services/journal/posts/getJournalPosts";
import converDateToString from "@/lib/utils/strings";
import {
  Paper,
  Text,
  Title,
  Divider,
  Stack,
  Box,
  Affix,
  Button,
  TextInput,
  Flex,
  Input,
  Space,
  Group,
  LoadingOverlay,
  Loader,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

interface JournalObject {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  posts: [];
}

const Journal = ({ params }: { params: { id: string } }) => {
  const [journal, setJournal] = useState<JournalObject>();
  const [journalPosts, setJournalPosts] = useState([]);
  const [createPost, setCreatePost] = useState(false);
  const [journalPostsLoading, setJournalPostsLoading] = useState(false);
  const { journals }: any = useJournalContext();
  const [loadingVisible, { open: setLoading, close: setNotLoading }] =
    useDisclosure(false);

  const postForm = useForm({
    initialValues: {
      title: "",
      post: "",
    },
    validate: {
      title: isNotEmpty("Enter a title."),
      post: isNotEmpty("Enter a post."),
    },
  });

  useEffect(() => {
    const currentJournal = journals.find(
      (journalObject: JournalObject) => journalObject.id === params.id
    );

    if (currentJournal) {
      setJournal(currentJournal);
      handleGetJournalPosts(currentJournal);
    }
  }, [journals, params]);

  const handleGetJournalPosts = async (currentJournal: JournalObject) => {
    setJournalPostsLoading(true);

    const journalPosts = await getJournalPosts(currentJournal.id);
    setJournalPosts(journalPosts);

    setJournalPostsLoading(false);
  };

  const handleSubmitForm = async (values: any) => {
    setLoading();

    const res = await createJournalPost(params.id, values.title, values.post);

    if (!res.error && journal) {
      await handleGetJournalPosts(journal);
      handleResetForm();
    }

    setNotLoading();
  };

  const handleResetForm = () => {
    postForm.reset();
    setCreatePost(false);
  };

  return (
    journal && (
      <>
        <Box my="lg">
          <Title>Journal</Title>
          <Divider my="sm" />
        </Box>
        <Paper shadow="lg" radius="md" p="xl" my="lg" withBorder>
          <Title>{journal?.title}</Title>
          <Text>{journal?.description}</Text>
        </Paper>
        <Box my="lg">
          <Title>Posts</Title>
          <Divider my="sm" />
        </Box>
        {journalPostsLoading ? (
          <Flex justify="center" align="center" h={300}>
            <Loader color="blue" />
          </Flex>
        ) : (
          <Stack gap="xs">
            {createPost && (
              <Box pos="relative">
                <LoadingOverlay
                  visible={loadingVisible}
                  zIndex={1000}
                  overlayProps={{ radius: "sm", blur: 2 }}
                />
                <Paper shadow="lg" radius="md" p="xl" withBorder>
                  <form
                    onSubmit={postForm.onSubmit(handleSubmitForm)}
                    onReset={() => postForm.reset()}
                  >
                    <Stack>
                      <TextInput
                        label="Title"
                        description="The title of your post."
                        placeholder="Title here"
                        styles={{
                          label: { fontSize: 20 },
                          description: { fontSize: 15 },
                        }}
                        {...postForm.getInputProps("title")}
                      />
                      <Input.Wrapper
                        label="Post"
                        description="Enter your post here."
                        styles={{
                          label: { fontSize: 20 },
                          description: { fontSize: 15 },
                        }}
                        {...postForm.getInputProps("post")}
                      >
                        <Space h="xs" />
                        <TextEditor
                          setContent={(value) =>
                            postForm.setValues({
                              post: value !== "<p></p>" ? value : "",
                            })
                          }
                          error={postForm.getInputProps("post").error}
                        />
                        <Space h="xs" />
                      </Input.Wrapper>
                      <Flex justify="flex-end">
                        <Group gap="xs">
                          <Button variant="default" onClick={handleResetForm}>
                            Cancel
                          </Button>
                          <Button type="submit">Create Post</Button>
                        </Group>
                      </Flex>
                    </Stack>
                  </form>
                </Paper>
              </Box>
            )}
            {journalPosts.map((post: any) => (
              <Paper shadow="lg" radius="md" p="xl" key={post.id} withBorder>
                <Title>{post.title}</Title>
                <Text>Posted on {converDateToString(post.createdAt)}</Text>
                <Space h="xs" />
                <Box dangerouslySetInnerHTML={{ __html: post.post }} />
              </Paper>
            ))}
          </Stack>
        )}
        {!createPost && (
          <Affix position={{ bottom: 25, right: 25 }}>
            <Button size="lg" radius="xl" onClick={() => setCreatePost(true)}>
              Create post
            </Button>
          </Affix>
        )}
      </>
    )
  );
};

export default Journal;
