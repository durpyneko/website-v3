import { Image, Box, Center } from "@chakra-ui/react";
import NiceTooltip from "../CustomElements/NiceTooltip";
import { RiFileImageLine } from "react-icons/ri";

interface DiscordActivityBoxProps {
  activity: any;
  index: number;
  [key: string]: any;
}

export default function DiscordActivityImage({
  activity,
  index,
  ...rest
}: DiscordActivityBoxProps) {
  const largeImage = activity?.assets?.large_image;

  const isExternalImage = largeImage?.startsWith("mp:external/");

  const externalImageUrl = isExternalImage
    ? largeImage.split("/https/")[1]
    : null;

  const largeImageSrc = isExternalImage
    ? `https://${externalImageUrl}`
    : `https://cdn.discordapp.com/app-assets/${
        activity?.application_id ?? ""
      }/${largeImage}.png`;

  return (
    <>
      <Box position="relative" display="inline-block" {...rest}>
        <NiceTooltip label={activity?.assets?.large_text}>
          {largeImage ? (
            <Image
              src={largeImageSrc}
              alt={activity?.assets?.large_text}
              borderRadius="md"
              boxSize="100%"
              minW={"110px"}
              objectFit="cover"
            />
          ) : (
            <Center>
              <RiFileImageLine size="100%" />
            </Center>
          )}
        </NiceTooltip>
        {activity?.assets && activity?.assets?.small_image && (
          <NiceTooltip label={activity?.assets?.small_text}>
            <Image
              src={`https://cdn.discordapp.com/app-assets/${
                activity?.application_id ?? ""
              }/${activity?.assets?.small_image}.png`}
              alt={activity?.assets?.small_text}
              borderRadius="full"
              boxSize="30px"
              objectFit="cover"
              position="absolute"
              bottom="-6px"
              right="-6px"
              border="3px solid"
              borderColor={"bgHover"}
              bg={"black"}
            />
          </NiceTooltip>
        )}
      </Box>
    </>
  );
}
