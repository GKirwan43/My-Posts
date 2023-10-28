import { Journal } from "@/lib/utils/interfaces";
import { Paper, Text, Title } from "@mantine/core";

type Props = {
  title: string;
  description: string;
};

const TitleDescriptionCard = ({ title, description }: Props) => {
  return (
    <Paper shadow="lg" radius="md" p="xl" my="lg" withBorder>
      <Title>{title}</Title>
      <Text>{description}</Text>
    </Paper>
  );
};

export default TitleDescriptionCard;
