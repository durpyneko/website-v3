// Next
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";

// Chakra
import { Box, Center, ChakraProvider, Text } from "@chakra-ui/react";
import theme from "@/lib/theme";

// Components
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Spacer from "@/components/Spacer";
import Footer from "@/components/Footer";
import Kikuri from "@/components/Kikuri";

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
import ToggleThemeButton from "@/components/ToggleThemeButton";
import useCookiePoller from "@/components/hooks/useCookiePoller";
import KikuriDvdScreensaver from "@/components/KikuriDvdScreensaver";
const Gugi_ = Gugi({ subsets: ["latin"], weight: "400", display: "swap" });

export default function MyApp({ Component, pageProps }: AppProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [themeK, setThemeK] = useState<number>();

  const themeCookie = useCookiePoller("theme");

  useEffect(() => {
    if (typeof document !== "undefined") {
      setThemeK(Number(themeCookie));
    }
  }, [themeCookie]);

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Analytics />
      <SpeedInsights />
      <Kikuri />
      <KikuriDvdScreensaver />
      <Box
        h={"100vh"}
        className={Gugi_.className}
        bgImage={!themeK ? "url('/images/wife/20240913_113158.jpg')" : "none"}
        bgSize={"cover"}
        bgPosition={"center center"}
        backgroundRepeat="no-repeat"
        backgroundColor={!themeK ? "rgba(0, 0, 0, 0.7)" : "background"}
        backgroundBlendMode="darken"
        transition={"background 0.5s ease"}
      >
        <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Component
          {...pageProps}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <ToggleThemeButton />
        <Spacer />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
