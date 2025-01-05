import { Box, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Presence } from "@/pages/api/discord";
import NiceBox from "./CustomElements/NiceBox";
import NiceTooltip from "./CustomElements/NiceTooltip";

interface SpotifyBoxProps {
  presence: Presence | null;
  children?: React.ReactNode;
  [key: string]: any;
}

function calculateProgress(startTimestamp: number, endTimestamp: number) {
  const now = Date.now();
  const totalDuration = endTimestamp - startTimestamp;
  const elapsed = now - startTimestamp;
  return Math.min((elapsed / totalDuration) * 100, 100);
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function SpotifyBox({
  presence,
  children,
  ...rest
}: SpotifyBoxProps) {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [accTog, setAccTog] = useState(false);

  useEffect(() => {
    if (presence && presence.spotify && presence.spotify.timestamps) {
      const { start, end } = presence.spotify.timestamps;
      setTotalDuration(end - start);
      const interval = setInterval(() => {
        const now = Date.now();
        setProgress(calculateProgress(start, end));
        setElapsedTime(now - start);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [presence]);

  return (
    <NiceBox p={0} {...rest}>
      <Box
        bg="bgHover"
        borderTopRadius={"8px"}
        boxShadow={"0px 3px 6px -2px background"}
      >
        <HStack p={2} px={3} justifyContent="space-between" fontWeight={"bold"}>
          <Text>Spotify</Text>
          <Text>🗕 🗗 🗙</Text>
        </HStack>
      </Box>
      <Box p={4} maxW={["90%", "320px"]}>
        <HStack>
          <NiceTooltip label={presence?.spotify?.album}>
            <Image
              src={presence?.spotify?.album_art_url}
              boxSize="100%"
              maxH="111px"
              minH="111px"
              maxW="111px"
              minW="111px"
              borderRadius={"8px"}
            />
          </NiceTooltip>

          <VStack
            align="start"
            gap={1}
            pl={2}
            minW={["70%", "100%"]}
            maxW={["120vw", "100%"]}
          >
            <NiceTooltip label={presence?.spotify?.song} openDelay={1000}>
              <Link
                href={`https://open.spotify.com/track/${presence?.spotify?.track_id}`}
                isExternal
              >
                <Text
                  fontSize="xl"
                  isTruncated
                  maxW={["45vw", "290px"]}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {presence?.spotify?.song}
                </Text>
              </Link>
            </NiceTooltip>
            <NiceTooltip label={presence?.spotify?.artist} openDelay={1000}>
              <Text
                color={"rgba(188, 177, 198, 0.5)"}
                isTruncated
                maxW={["45vw", "290px"]}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {presence?.spotify?.artist}
              </Text>
            </NiceTooltip>
            <Box
              w="100%"
              bg="rgba(188, 177, 198, 0.2)"
              h="4px"
              borderRadius="2px"
              mt={2}
            >
              <Box
                w={`${progress}%`}
                h="100%"
                bg="rgba(30, 190, 96, 0.8)"
                borderRadius="2px"
                transition="width 1s linear"
              />
            </Box>
            <HStack w="100%" justifyContent="space-between">
              <Text color={"rgba(188, 177, 198, 0.5)"}>
                {formatTime(elapsedTime)}
              </Text>
              <Text color={"rgba(188, 177, 198, 0.5)"}>
                {formatTime(totalDuration)}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </NiceBox>
  );
}
