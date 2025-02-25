import {
  AbsoluteCenter,
  Avatar,
  AvatarBadge,
  Box,
  HStack,
  Spinner,
  Text,
  VStack,
  Flex,
  BoxProps,
  Center,
} from "@chakra-ui/react";
import { Presence } from "@/pages/api/discord";
import { useEffect, useState } from "react";
import NiceBox from "./CustomElements/NiceBox";
import NiceTooltip from "./CustomElements/NiceTooltip";
import DiscordActivityImage from "./DiscordActivities/DiscordActivityImage";

const userId = "763864687481323620";

interface DiscordBoxProps extends BoxProps {
  presence: Presence | null;
  children?: React.ReactNode;
  [key: string]: any;
}

function calculateTimeSince(startTimestamp: number) {
  const now = Date.now();
  const elapsed = now - startTimestamp;
  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
  const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function DiscordBox({
  presence,
  children,
  ...rest
}: DiscordBoxProps) {
  const [timesSinceStart, setTimesSinceStart] = useState<string[]>([]);

  useEffect(() => {
    if (presence && presence.activities) {
      const intervals = presence.activities.map((activity, index) => {
        const startTimestamp = activity.timestamps?.start;
        if (startTimestamp) {
          return setInterval(() => {
            setTimesSinceStart((prevTimes) => {
              const newTimes = [...prevTimes];
              newTimes[index] = calculateTimeSince(startTimestamp);
              return newTimes;
            });
          }, 1000);
        }
        return null;
      });

      return () => {
        intervals.forEach((interval) => {
          if (interval) clearInterval(interval);
        });
      };
    }
  }, [presence]);

  const nonSpotifyActivities =
    presence?.activities
      ?.map((activity, index) => ({
        ...activity,
        originalIndex: index,
      }))
      .filter(
        (activity) =>
          activity.name !== "Spotify" && activity.name !== "Custom Status"
      ) || [];

  return (
    <>
      {presence ? (
        <NiceBox p={0} w={"100%"} {...rest}>
          <Box
            bg="bgHover"
            borderTopRadius={"8px"}
            w={"100%"}
            boxShadow={"0px 3px 6px -2px background"}
            zIndex={0}
          >
            <HStack
              p={2}
              px={3}
              justifyContent="space-between"
              textAlign={"center"}
              alignContent={"center"}
              fontWeight={"bold"}
            >
              <Text>Discord</Text>
              <Text>🗕 🗗 🗙</Text>
            </HStack>
          </Box>

          <Box p={4}>
            <HStack>
              <Avatar
                src={`https://cdn.discordapp.com/avatars/${userId}/${presence.discord_user.avatar}.png`}
              >
                {(presence.discord_status === "online" && (
                  <NiceTooltip label="Online">
                    <AvatarBadge boxSize="1em" bg="green.500" />
                  </NiceTooltip>
                )) ||
                  (presence.discord_status === "idle" && (
                    <NiceTooltip label="Idle">
                      <AvatarBadge boxSize="1em" bg="yellow.500" />
                    </NiceTooltip>
                  )) ||
                  (presence.discord_status === "dnd" && (
                    <NiceTooltip label="Do Not Disturb">
                      <AvatarBadge boxSize="1em" bg="red.500" />
                    </NiceTooltip>
                  )) ||
                  (presence.discord_status === "offline" && (
                    <NiceTooltip label="Offline">
                      <AvatarBadge boxSize="1em" bg="gray.500" />
                    </NiceTooltip>
                  ))}
              </Avatar>
              <VStack align="start" spacing={0} pl={2}>
                <Text fontSize={["lg", "larger"]} fontWeight={"bold"}>
                  {presence.discord_user.display_name}
                </Text>
                <Text
                  fontSize={["sm", "lg"]}
                  color={"rgba(188, 177, 198, 0.5)"}
                >
                  {presence.discord_user.username}
                </Text>
              </VStack>
            </HStack>

            {presence.activities && presence.activities[0] && (
              <NiceBox
                maxW={"100%"}
                p={3}
                px={4}
                minH={0}
                mt={2}
                borderColor={"rgba(128, 90, 213, 0.5)"}
                bg={"bgHover"}
              >
                <NiceTooltip
                  label={presence.activities[0].state}
                  openDelay={1000}
                >
                  <Text
                    isTruncated
                    textOverflow={"ellipsis"}
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    {presence.activities[0].state}
                  </Text>
                </NiceTooltip>
              </NiceBox>
            )}

            {nonSpotifyActivities &&
              nonSpotifyActivities.map((activity, index) => (
                <Flex
                  key={activity.originalIndex}
                  gap={2}
                  alignItems="center"
                  justifyContent="flex-start"
                  bg={"bgHover"}
                  p={2}
                  borderRadius={"8px"}
                  px={3}
                  mt={index > -1 ? 2 : 0}
                >
                  <DiscordActivityImage
                    activity={activity}
                    index={activity.originalIndex}
                    height={"110px"}
                    width={"110px"}
                  />
                  <VStack align="start" gap={1} ml={1}>
                    <Text fontWeight={"bold"}>{activity.name}</Text>
                    <NiceTooltip label={activity.details} openDelay={1000}>
                      <Text
                        isTruncated
                        maxW={["43vw", "280px"]}
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {activity.details}
                      </Text>
                    </NiceTooltip>
                    <NiceTooltip label={activity.state} openDelay={1000}>
                      <Text
                        isTruncated
                        maxW={["43vw", "280px"]}
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {activity.state}
                      </Text>
                    </NiceTooltip>
                    <Text>{timesSinceStart[activity.originalIndex]}</Text>
                  </VStack>
                </Flex>
              ))}
            {children}
          </Box>
        </NiceBox>
      ) : (
        <NiceBox position={"absolute"} top={5} p={10} {...rest}>
          <Spinner />
        </NiceBox>
      )}
    </>
  );
}
