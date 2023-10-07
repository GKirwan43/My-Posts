"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  white: "#f8f9fa",
  black: "#212529",

  colors: {
    blue: ["#e1f9ff", "#ccedff", "#9ad7ff", "#64c1ff", "#3baefe", "#20a2fe", "#099cff", "#0088e4", "#0078cd", "#0069b6"],
    dark: ["#d5d7e0", "#acaebf", "#8c8fa3", "#666980", "#4d4f66", "#34354a", "#2b2c3d", "#1d1e30", "#0c0d21", "#01010a"],
  },

  primaryColor: "blue",

  fontFamily: "Open Sans, sans-serif",
});
