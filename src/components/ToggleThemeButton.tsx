import { Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiFairyWand } from "react-icons/gi";

const themes = [{ name: "default" }, { name: "kikuri" }];

export default function ToggleThemeButton() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const cTheme = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("theme"));
    if (!cTheme) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(1);
    }
  }, []);

  function setCookie(cvalue: number) {
    document.cookie = `theme=${cvalue};max-age=31536000;path=/`;
    setCurrentIndex(cvalue);
  }

  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      zIndex={1000}
      bgColor={"rgba(0, 0, 0, 0.5)"}
      p={2}
      borderRadius={3}
      cursor={"pointer"}
      onClick={() => setCookie((currentIndex + 1) % themes.length)}
    >
      <Center>
        <GiFairyWand />
      </Center>
    </Box>
  );
}
