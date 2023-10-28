import { Box, Divider, Title } from "@mantine/core";

type Props = {
  title: String;
};

const SectionHeaderDivider = ({ title }: Props) => {
  return (
    <>
      <Box my="lg">
        <Title>{title}</Title>
        <Divider my="sm" />
      </Box>
    </>
  );
};

export default SectionHeaderDivider;
