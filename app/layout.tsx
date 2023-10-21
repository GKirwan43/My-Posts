import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { AuthContextProvider } from "@/context/AuthContextProvider";
import { theme } from "@/lib/mantine/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "My Posts",
  description: "Post app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <ModalsProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
