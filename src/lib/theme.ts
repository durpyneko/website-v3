// Chackra
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  shadows: {
    shadow: "0px 0px 4px 0px rgba(2, 2, 2, 0.8)",
    glow: "0px 0px 4px 2px rgba(64, 64, 90, 0.6)",
  },
  colors: {
    color: "rgb(188, 177, 198)",
    background: "#14141a",
    bg: "#22222a",
    transp: "rgba(0, 0, 0, 0.4)",
    border: "#34363d",
    bgHover: "#2e2e38",
    bgSelected: "#30303a",
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: "color",
        background: "background",
      },
    }),
  },
});

export default theme;
