import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  AbsoluteCenter,
  Flex,
  Text,
  HStack,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useDiscordPresence } from "@/pages/api/discord";
import Draggable from "react-draggable";
import DiscordBox from "../DiscordBox";
import SpotifyBox from "../SpotifyBox";
import AnilistBox from "../AnilistBox";
import NiceBox from "../CustomElements/NiceBox";
import NiceDivider from "../CustomElements/NiceDivider";

const MotionBox = motion(Box);

export default function HomePanel() {
  const presence = useDiscordPresence();
  const isSmallDevice = useBreakpointValue({ base: true, md: false });
  const [showSpotify, setShowSpotify] = useState(!!presence?.spotify);

  useEffect(() => {
    if (presence?.spotify) {
      setShowSpotify(true);
    } else {
      setShowSpotify(false);
    }
  }, [presence?.spotify]);

  return (
    <Flex
      w={"100%"}
      gap={4}
      direction={"row"}
      wrap={["wrap", "wrap", "wrap", "wrap", "nowrap"]}
    >
      <Flex direction={"column"} gap={4}>
        {presence ? (
          <>
            <Draggable disabled={isSmallDevice}>
              <Box
                position="relative"
                role="group"
                display={"flex"}
                justifyContent="center"
                css={{
                  animation: "slideToLeft 0.4s ease-in-out",
                }}
              >
                <DiscordBox
                  presence={presence}
                  borderColor={"rgba(128, 90, 213, 0.5)"}
                  transition="box-shadow 0.3s ease-in-out"
                  _hover={{
                    boxShadow: "0px 0px 20px 8px rgba(128, 90, 213, 0.3)",
                  }}
                  w={["90vw", "450px", "450px"]}
                />
              </Box>
            </Draggable>

            <AnimatePresence>
              {showSpotify && (
                <Draggable disabled={isSmallDevice}>
                  <MotionBox
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SpotifyBox
                      presence={presence}
                      position="relative"
                      borderColor={"rgba(30, 215, 96, 0.5)"}
                      transition="box-shadow 0.3s ease-in-out"
                      _hover={{
                        boxShadow: "0px 0px 20px 8px rgba(30, 215, 96, 0.3)",
                      }}
                      w={["90vw", "450px", "450px"]}
                    />
                  </MotionBox>
                </Draggable>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Box mt={10}>
            <AbsoluteCenter>
              <Spinner />
            </AbsoluteCenter>
          </Box>
        )}
      </Flex>

      <AnilistBox />

      <Draggable disabled={isSmallDevice}>
        <NiceBox
          p={0}
          borderColor={"rgba(113, 30, 215, 0.5)"}
          transition="box-shadow 0.3s ease-in-out"
          _hover={{
            boxShadow: "0px 0px 20px 8px rgba(113, 30, 215, 0.3)",
          }}
          w={["90vw", "100%"]}
          maxW={["90vw", "300px", "400px"]}
          minW={["90vw", "300px"]}
          css={{
            opacity: 0,
            transform: "translateX(-5%)",
            animation: "slideToRight 0.4s ease-in-out",
            /* animationDelay: "0.6s", */
            animationFillMode: "forwards",
          }}
        >
          <Box
            bg="bgHover"
            borderTopRadius={"8px"}
            w={"100%"}
            zIndex={0}
            borderBottomRadius={0}
            transition="border-radius 0.3s ease-in-out"
          >
            <HStack
              p={2}
              px={3}
              justifyContent="space-between"
              textAlign={"center"}
              alignContent={"center"}
              fontWeight={"bold"}
            >
              <Text>Text</Text>
              <Text>🗕 🗗 🗙</Text>
            </HStack>
          </Box>
          <Box p={4}>
            <Text fontSize={"4xl"}>Hello World!</Text>
            <Divider />
            <Box pb={2} />
            <Text>&#9888; description missing</Text>
          </Box>
        </NiceBox>
      </Draggable>
    </Flex>
  );
}
