// Next
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useState } from "react";

// Chakra
import { Box, Center, ChakraProvider, Text } from "@chakra-ui/react";
import theme from "@/lib/theme";

// Components
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Spacer from "@/components/Spacer";
import Footer from "@/components/Footer";

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
const Gugi_ = Gugi({ subsets: ["latin"], weight: "400", display: "swap" });

export default function MyApp({ Component, pageProps }: AppProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Analytics />
      <SpeedInsights />

      <Box h={"100vh"} className={Gugi_.className}>
        <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Component
          {...pageProps}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <Spacer />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
