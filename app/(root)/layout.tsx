import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Navbar from "@/components/navigation/Navbar";
import { theme } from "@/lib/mantine/theme";

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
          <Navbar />
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
