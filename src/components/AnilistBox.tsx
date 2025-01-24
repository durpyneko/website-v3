import {
  Box,
  Center,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import AnilistActBox from "./AnilistActBox";
import NiceBox from "./CustomElements/NiceBox";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

interface AniListResponse {
  User: {
    id: number;
    name: string;
    avatar: {
      large: string;
      medium: string;
    };
    bannerImage: string;
  };
  Page: {
    activities: Activity[];
  };
}

type Activity = ListActivity;

export interface ListActivity {
  id: number;
  status: string;
  progress: string | null;
  createdAt: number;
  media: {
    title: {
      romaji: string;
      english: string;
    };
    coverImage: {
      large: string;
    };
    bannerImage: string;
    siteUrl: string;
  };
  siteUrl: string;
}

export default function AnilistBox() {
  const isSmallDevice = useBreakpointValue({ base: true, md: false });

  const [alData, setAlData] = useState<AniListResponse>();
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const query = `
        query ($userId: Int) {
          User(id: $userId) {
            id
            name
            avatar {
              large
            }
            bannerImage
          }
          Page(page: 1, perPage: 5) {
            activities(userId: $userId, sort: ID_DESC) {
              ... on ListActivity {
                id
                status
                progress
                createdAt
                media {
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                bannerImage
                siteUrl
                }
                siteUrl
              }
            }
          }
        }
      `;

    const variables = {
      userId: 5793689,
    };

    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setAlData(result.data);
        setLoading(false);
        setIsLoaded(true);
        console.log(result.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Draggable disabled={isSmallDevice}>
      <NiceBox
        p={4}
        pt={0}
        px={0}
        maxWidth={["90vw", "600px", "700px"]}
        borderColor={"rgba(47, 94, 148, 0.8)"}
        transition="box-shadow 0.3s ease-in-out"
        _hover={{
          boxShadow: "0px 0px 20px 8px rgba(47, 94, 148, 0.6)",
        }}
        css={{
          animation: "slideDown 0.4s ease-in-out",
        }}
        minW={"300px"}
        minH={"60px"}
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
            <Text>Anilist</Text>
            <Text>🗕 🗗 🗙</Text>
          </HStack>
        </Box>

        {!loading ? (
          <>
            <Link
              href={`https://anilist.co/user/${alData?.User.id}`}
              target="_blank"
              _hover={{ textDecoration: "unset" }}
            >
              <Box
                p={5}
                backgroundImage={alData?.User.bannerImage}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                backgroundColor="rgba(10, 10, 10, 0.5)"
                backgroundBlendMode="darken"
                /* backgroundClip={"text"} */
                textShadow={"0px 2px 3px rgba(0, 0, 0, 0.5)"}
                /* boxShadow={"inset 0 40px 300px rgba(0, 0, 0, 0.8)"} */
                boxShadow="inset 0 -20px 30px 0px rgba(0, 0, 0, 0.8)"
              >
                <HStack>
                  <Image
                    src={alData?.User.avatar.large}
                    boxSize={[20, 40]}
                    borderRadius={4}
                  />
                  <VStack
                    gap={0}
                    alignItems={"unset"}
                    p={0}
                    pt={2}
                    lineHeight="shorter"
                  >
                    <Text
                      color={"whiteAlpha.500"}
                      fontWeight={"bold"}
                      ml={5}
                      fontSize={["5xl", "8xl"]}
                      mt={-5}
                    >
                      Anilist
                    </Text>
                    <Text fontWeight={"bold"} fontSize={["xl", "4xl"]} ml={5}>
                      {alData?.User.name}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Link>
            <Center mt={4}>
              <VStack w={"100%"}>
                {alData?.Page.activities.map((data, index) => (
                  <MotionVStack
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    w={"100%"}
                  >
                    <AnilistActBox data={data} />
                  </MotionVStack>
                ))}
              </VStack>
            </Center>
          </>
        ) : (
          <Box>
            <Center mt={4}>
              <Spinner />
            </Center>
          </Box>
        )}
      </NiceBox>
    </Draggable>
  );
}
