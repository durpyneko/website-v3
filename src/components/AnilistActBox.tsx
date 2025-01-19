import { Box, Center, HStack, Image, Link, Text } from "@chakra-ui/react";
import NiceBox from "./CustomElements/NiceBox";
import { ListActivity } from "./AnilistBox";

interface AnilistActBoxProps {
  data: ListActivity;
}

export default function AnilistActBox({ data }: AnilistActBoxProps) {
  return (
    <Link
      href={data.siteUrl}
      target="_blank"
      w={"100%"}
      _hover={{ textDecoration: "unset" }}
    >
      <NiceBox
        mx={4}
        borderColor={"rgba(47, 94, 148, 0.8)"}
        backgroundImage={data.media.bannerImage}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundColor="rgba(10, 10, 10, 0.8)"
        backgroundBlendMode="darken"
        maxH={"100px"}
        p={2}
      >
        <HStack>
          <Image
            src={data.media.coverImage.large}
            maxH="80px"
            objectFit="cover"
            borderRadius="md"
          ></Image>
          <Box
            ml={3}
            fontSize={["lg", "lg", "2xl"]}
            textOverflow={"ellipsis"}
            white-space="nowrap"
            overflow="hidden"
            noOfLines={3}
            minW={"200px"}
          >
            <Text
              as={"span"}
              color={
                data.status.startsWith("watched")
                  ? "green.100"
                  : data.status.startsWith("completed")
                  ? "blue.300"
                  : data.status.startsWith("on hold")
                  ? "yellow.400"
                  : data.status.startsWith("dropped")
                  ? "red.500"
                  : "gray.500"
              }
            >
              {data.status.split(" ")[0].charAt(0).toUpperCase() +
                data.status.split(" ")[0].slice(1)}
            </Text>{" "}
            <Text as={"span"}>
              {" "}
              {/* color={"gray.500"} */}
              {data.status.split(" ").slice(1).join(" ")}
            </Text>{" "}
            <Text as={"span"} color={"green.100"}>
              {data.progress}
            </Text>{" "}
            {data.status.startsWith("watched") && "of"}{" "}
            <Link
              href={data.media.siteUrl}
              target="_blank"
              /* _hover={{ textDecoration: "unset" }} */
            >
              <Text as={"span"} color={"purple.300"}>
                {data.media.title.english}
              </Text>
            </Link>
          </Box>
        </HStack>
      </NiceBox>
    </Link>
  );
}
