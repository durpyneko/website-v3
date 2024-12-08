// Imports
import axios from "axios";

// React
import { useEffect, useState } from "react";

// Chakra
import {
  Box,
  Center,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";

// Components
import Header from "@/components/Header";
import CustomBox from "@/components/CustomElements/OsuBox";

// Fonts
import { Rubik_Glitch } from "next/font/google";
import { resolve } from "path/posix";
const RubikGlitch = Rubik_Glitch({ subsets: ["latin"], weight: "400" });

// Types
type OsuUser = {
  user_id: string;
  username: string;
  join_date: string;
  level: number;
  pp_rank: number;
  accuracy: number;
  total_seconds_played: number;
};

export default function Home() {
  const theme = useTheme();

  const [user_data_loading, user_data_setLoading] = useState(true);
  const [user_dat_error, user_dat_setError] = useState("");
  const [user_data, set_user_data] = useState<OsuUser>();

  useEffect(() => {
    axios
      .get("/api/osu")
      .then((response) => {
        set_user_data(response.data.data[0] || "No user data found");
        user_data_setLoading(false);
      })
      .catch((err) => {
        user_dat_setError("Failed to fetch user data");
        user_data_setLoading(false);
        console.error(err);
      });
  }, []);

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

            <Box mt={10}></Box>

            <CustomBox>
              <Text
                color={"#ff66ab"}
                textDecor={"underline"}
                fontWeight={"bold"}
                pb={2}
                fontSize={"2xl"}
              >
                Osu! Stats:
              </Text>
              <HStack gap={6}>
                <Image
                  src={`https://a.ppy.sh/${user_data?.user_id}`}
                  maxWidth={["40%", 40, 40]}
                  borderRadius={12}
                ></Image>
                {user_data_loading ? (
                  <Center>
                    <Spinner size="lg" />
                    <Text pl={2}>Loading...</Text>
                  </Center>
                ) : user_dat_error ? (
                  <Text color="red.500">{user_dat_error}</Text>
                ) : user_data ? (
                  <Box>
                    <Text>
                      <Text color={"#ff66ab"} as={"span"}>
                        User ID:{" "}
                      </Text>
                      {user_data.user_id}
                    </Text>
                    <Text>
                      <Text color={"#ff66ab"} as={"span"}>
                        Username:{" "}
                      </Text>
                      {user_data.username}
                    </Text>
                    <Text>
                      <Text color={"#ff66ab"} as={"span"}>
                        Global:{" "}
                      </Text>
                      {Number(user_data.pp_rank).toLocaleString()}
                    </Text>
                    <Text>
                      <Text color={"#ff66ab"} as={"span"}>
                        Accuracy:{" "}
                      </Text>
                      {Number(user_data.accuracy).toFixed(2)}%
                    </Text>
                    <Text>
                      <Text color={"#ff66ab"} as={"span"}>
                        Level:{" "}
                      </Text>
                      {Number(user_data.level).toFixed(0)}
                    </Text>
                    <Text>
                      <Text color={"#ff66ab"} as={"span"}>
                        Join Date:
                      </Text>{" "}
                      {
                        new Date(user_data.join_date)
                          .toISOString()
                          .split("T")[0]
                      }
                    </Text>

                    <Text>
                      <Text color={"#ff66ab"} as={"span"}>
                        Play time:
                      </Text>{" "}
                      {Number(user_data.total_seconds_played / 3600).toFixed(2)}{" "}
                      hrs
                    </Text>
                  </Box>
                ) : (
                  <Text color={"#ff66ab"} as={"span"}>
                    No user data available
                  </Text>
                )}
              </HStack>
            </CustomBox>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}
