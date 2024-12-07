// Next
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Chakra
import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import theme from "@/lib/theme";

// Components
import Header from "@/components/Header";

// CSS
import "@/styles/globals.css";

const helloConsole = [
  "color: purple",
  "font-size: 16px",
  "font-weight: bold",
  "font-family: monospace",
  "background-color: pink",
  "padding: 10px",
  "border: 2px solid purple",
].join(";");

if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("%cHello there! ", helloConsole);
  });
}

// Fonts
import { Gugi } from "next/font/google";
const Gugi_ = Gugi({ subsets: ["latin"], weight: "400" });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Analytics />
      <SpeedInsights />

      <Box h={"100vh"} className={Gugi_.className}>
        <Component {...pageProps} />
        <Box pb={10}></Box>
        <Center>
          <Box position={"absolute"} bottom={0}>
            Version: 3.0 | In the works
          </Box>
        </Center>
      </Box>
    </ChakraProvider>
  );
}
