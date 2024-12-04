// Chackra
import { background, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    color: "rgb(131, 127, 142)",
    background: "#0d0d0d",
  },
  accent: {
    light: "#B00B69",
    default: "#B00B69",
    dark: "#420A55",
    bg: "#420A55",
    divider: "#042069",
    transparent: "transparent",
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontfamily: "Doto-Regular",
        color: "color",
        background: "background",
      },
    }),
  },
});

export default theme;
