// Next
import NextLink from "next/link";

// Chakra
import {
  Box,
  Center,
  Image,
  Link,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";

// Components
import Header from "@/components/Header";

// Fonts
import { Rubik_Glitch } from "next/font/google";
const RubikGlitch = Rubik_Glitch({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const theme = useTheme();

  return (
    <Box>
      <Header header="home" />

      <Box>
        <Center>
          <Text
            className={RubikGlitch.className}
            fontSize={{ sm: "6xl", base: "5xl" }}
          >
            Hello World!
          </Text>
        </Center>
        <Center pt={40}>
          <VStack>
            <Text>i fix computers and shit</Text>
            <Image
              pt={10}
              src="/wife/twitter_1689366204325179393.gif"
              maxW={40}
            ></Image>
            <Link
              href="https://x.com/vsioneithr/status/1689366204325179393"
              target="_blank"
            >
              <Text>source</Text>
            </Link>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}
