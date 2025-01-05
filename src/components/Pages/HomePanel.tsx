import {
  AbsoluteCenter,
  Box,
  Center,
  Flex,
  Image,
  Spinner,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { useDiscordPresence } from "@/pages/api/discord";
import NiceBox from "../CustomElements/NiceBox";
import DiscordBox from "../DiscordBox";
import SpotifyBox from "../SpotifyBox";

const glowing = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
`;

export default function HomePanel() {
  const presence = useDiscordPresence();
  return (
    <Box>
      {/* <Text fontSize={["40px", "44px", "48px"]} pt={2}>
        # Landing
      </Text> */}
      <Flex
        gap={4}
        wrap={["wrap", "wrap", "wrap", "nowrap"]}
        w={["90vw", "100%"]}
      >
        {presence ? (
          <>
            <Box
              position="relative"
              role="group"
              display={"flex"}
              justifyContent={["center", "normal"]}
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

            {presence?.spotify && (
              <Box>
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
              </Box>
            )}
          </>
        ) : (
          <Box mt={10}>
            <AbsoluteCenter>
              {/* <NiceBox p={20}>
          </NiceBox> */}
              <Spinner />
            </AbsoluteCenter>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
