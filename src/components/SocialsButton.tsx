import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { FiExternalLink } from "react-icons/fi";

import NiceBox from "./CustomElements/NiceBox";
import { useState } from "react";

interface SocialsButtonProps {
  icon: IconType;
  name: string;
  url: string;
  bg: string;
  backgroundPosition: string;
  backgroundSize?: string;
}

export default function SocialsButton({
  icon,
  name,
  url,
  bg,
  backgroundPosition,
  backgroundSize = "cover",
}: SocialsButtonProps) {
  const [hovering, setHovering] = useState(false);

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  /* const adjustedBackgroundPosition = isSmallScreen
    ? `0 calc(${backgroundPosition.split(" ")[1]} - 0px)` // 80
    : `0 calc(${backgroundPosition.split(" ")[1]} - 0px)`; // 160 */

  const adjustedBackgroundPosition = isSmallScreen
    ? `center calc(${backgroundPosition.split(" ")[1]} - 0px)`
    : `center calc(${backgroundPosition.split(" ")[1]} - 0px)`;

  return (
    <HStack
      position="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <NiceBox
        p={"14px"}
        h={"80px"}
        w={["90vw", "380px", "420px"]}
        bg="rgba(34, 34, 42, 1)"
        transition="box-shadow 0.3s ease-in-out"
        position="relative"
        overflow="hidden"
        _hover={{
          boxShadow: "glow",
        }}
        zIndex={2}
      >
        <Link href={url} target="_blank">
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            backgroundImage={`url('${bg}')`} // 20240928_133346.jpg
            backgroundSize={backgroundSize}
            backgroundPosition={adjustedBackgroundPosition}
            backgroundRepeat="no-repeat"
            backgroundColor="rgba(10, 10, 10, 0.7)"
            backgroundBlendMode="darken"
            zIndex={1}
          />
          <Flex zIndex={2} alignItems="center" position="relative">
            <Icon ml={2} as={icon} p={0} boxSize={"50px"} />
            <Center flex="1">
              <Text
                textAlign="center"
                fontSize={24}
                textDecor="none"
                _hover={{ textDecor: "none" }}
              >
                {name}
              </Text>
            </Center>
          </Flex>
        </Link>
      </NiceBox>

      {/* Slide-out box */}
      <Box
        className="slide-box"
        position="absolute"
        top={0}
        right={0}
        p={"14px"}
        h={"80px"}
        w={["90vw", "380px", "420px"]}
        bg="rgba(0, 0, 0, 0.4)"
        borderRadius="10px"
        /* boxShadow="0 0px 4px 2px rgba(0, 0, 0, 0.4)" */
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.4)"
        transform={hovering ? "translateX(15%)" : "translateX(0)"}
        transition="all 0.3s ease"
        opacity={hovering ? 1 : 0}
        zIndex={0}
      >
        <Center w={"100%"} h="100%">
          <Icon
            className="slideBoxIcon"
            position={"absolute"}
            right={"20px"}
            opacity={hovering ? 1 : 0}
            transition="opacity 0.3s ease"
            as={FiExternalLink}
            color="whiteAlpha.600"
            boxSize={"22px"}
          />
        </Center>
      </Box>
    </HStack>
  );
}
