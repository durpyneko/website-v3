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
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";

// Components
import Header from "@/components/Header";
import OsuBox from "@/components/OsuBox";
import NiceBox from "@/components/CustomElements/NiceBox";
import HomePanel from "@/components/Pages/HomePanel";

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

export default function Home({ selectedTab, setSelectedTab }: any) {
  const theme = useTheme();

  const [user_data_loading, user_data_setLoading] = useState(true);
  const [user_dat_error, user_dat_setError] = useState("");
  const [user_data, set_user_data] = useState<OsuUser>();

  useEffect(() => {
    /* axios
      .get("/api/osu")
      .then((response) => {
        set_user_data(response.data.data[0] || "No user data found");
        user_data_setLoading(false);
      })
      .catch((err) => {
        user_dat_setError("Failed to fetch user data");
        user_data_setLoading(false);
        console.error(err);
      }); */
  }, []);

  return (
    <Box>
      <Header header="Home" />

      <Center>
        <Tabs index={selectedTab} onChange={(index) => setSelectedTab(index)}>
          <TabPanels>
            <TabPanel p={0}>
              <HomePanel />
            </TabPanel>
            <TabPanel p={0}>
              <Text>Projects page</Text>
            </TabPanel>
            <TabPanel p={0}>
              <Text>Socials page</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Box>
  );
}
