import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface NotificationArgs {
  title?: string;
  message?: string;
}

const showSuccessNotification = ({
  title = "Success",
  message = "Operation was successfull.",
}: NotificationArgs) => {
  notifications.show({
    title: title,
    message: message,
    color: "teal",
    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    autoClose: 3000,
  });
};

const showErrorNotification = ({
  title = "Error",
  message = "An error occured.",
}: NotificationArgs) => {
  notifications.show({
    title: title,
    message: message,
    color: "red",
    icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
    autoClose: 3000,
  });
};

export { showSuccessNotification, showErrorNotification };
