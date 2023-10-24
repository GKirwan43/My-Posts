import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { AuthContextProvider } from "@/context/AuthContextProvider";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

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
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
