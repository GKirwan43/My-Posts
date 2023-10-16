import "@mantine/core/styles.css";
import { AuthContextProvider } from "@/context/AuthContextProvider";
import { theme } from "@/lib/mantine/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "My Posts",
  description: "Post app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
