import {
  Center,
  HStack,
  Image,
  Tab,
  TabList,
  Tabs,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import NiceTab from "@/components/CustomElements/NiceTab";
import { Rubik_Glitch } from "next/font/google";
import { useEffect, useState } from "react";
import useCookiePoller from "./hooks/useCookiePoller";

const RubikGlitch = Rubik_Glitch({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Navbar({ selectedTab, setSelectedTab }: any) {
  const [themeK, setThemeK] = useState<number>();
  const themeCookie = useCookiePoller("theme");

  useEffect(() => {
    setThemeK(Number(themeCookie));
  }, [themeCookie]);

  function setCookie(cvalue: number) {
    document.cookie = `pop=${cvalue};max-age=31536000;path=/`;
  }

  return (
    <Flex
      p={2}
      bgColor={!themeK ? "rgba(40, 40, 40, 0.2)" : "bg"}
      backdropFilter={"blur(10px)"}
      boxShadow="shadow"
      position="relative"
      alignItems="center"
      mb={4}
      zIndex={999}
    >
      <HStack
        gap={[2, 4]}
        pl={1}
        onClick={() => setCookie(1)}
        cursor={"pointer"}
      >
        <Image borderRadius={3} maxW={"50px"} src="/images/wife/crop.jpg" />
        <Text
          className={RubikGlitch.className}
          fontSize={{ sm: "4xl", base: "2xl" }}
          display={["none", "block"]}
        >
          v3.0
        </Text>
      </HStack>

      <Box
        ml={["80px", "0"]}
        pl={["125px", 40, 0]}
        position={["static", "absolute"]}
        left="50%"
        transform="translateX(-50%)"
      >
        <Tabs
          index={selectedTab}
          onChange={(index) => setSelectedTab(index)}
          variant="unstyled"
        >
          <TabList
            gap={[2]} // 1 , 2
          >
            <NiceTab isSelected={selectedTab === 0}>Home</NiceTab>
            <NiceTab isSelected={selectedTab === 1}>Projects</NiceTab>
            <NiceTab isSelected={selectedTab === 2}>Socials</NiceTab>
          </TabList>
        </Tabs>
      </Box>
    </Flex>
  );
}
