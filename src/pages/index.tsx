import { useEffect, useState } from "react";
import { Box, Center, Tabs, TabPanel, TabPanels, Text } from "@chakra-ui/react";
import Header from "@/components/Header";
import HomePanel from "@/components/Pages/HomePanel";
import SocialsPage from "@/components/Pages/SocialsPage";

export default function Home({ selectedTab, setSelectedTab }: any) {
  const [currentTab, setCurrentTab] = useState(selectedTab);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (selectedTab !== currentTab && !isAnimating) {
      setIsAnimating(true);

      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setCurrentTab(selectedTab);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [selectedTab, currentTab]);

  return (
    <Box>
      <Header header="Home" />
      <Center m={2} pt={0}>
        <Tabs index={currentTab}>
          <TabPanels>
            <TabPanel
              p={0}
              style={{
                animation: isAnimating
                  ? "slideUp 0.4s ease-in-out"
                  : "slideDown 0.4s ease-in-out",
              }}
            >
              <HomePanel />
            </TabPanel>
            <TabPanel
              p={0}
              style={{
                animation: isAnimating
                  ? "slideUp 0.4s ease-in-out"
                  : "slideDown 0.4s ease-in-out",
              }}
            >
              <Text>Projects page</Text>
            </TabPanel>
            <TabPanel
              p={0}
              style={{
                animation: isAnimating
                  ? "slideUp 0.4s ease-in-out"
                  : "slideDown 0.4s ease-in-out",
              }}
            >
              <SocialsPage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Box>
  );
}
