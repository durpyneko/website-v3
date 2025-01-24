import SocialsButton from "@/components/SocialsButton";
import { Box, Center, keyframes, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import {
  RiDiscordFill,
  RiGithubFill,
  RiSteamFill,
  RiTwitterXLine,
} from "react-icons/ri";
import { SiAnilist } from "react-icons/si";
import { FiRefreshCcw } from "react-icons/fi";
import NiceBox from "../CustomElements/NiceBox";
import { useEffect, useState } from "react";

interface ButtonProps {
  icon: IconType;
  name: string;
  url: string;
}

type Buttons = ButtonProps[];

const buttons: Buttons = [
  { icon: RiDiscordFill, name: "Discord", url: "https://discord.com/" },
  { icon: RiTwitterXLine, name: "Twitter / X", url: "https://x.com/durpyneko" },
  {
    icon: RiGithubFill,
    name: "Github",
    url: "https://github.com/durpyneko/",
  },
  {
    icon: RiSteamFill,
    name: "Steam",
    url: "https://steamcommunity.com/id/durpyneko/",
  },
  {
    icon: SiAnilist,
    name: "Anilist",
    url: "https://anilist.co/user/durpyneko/",
  },
];

interface BackgroundImage {
  name: string;
  overwrite_vertical?: number;
}

type BackgroundImages = BackgroundImage[];

const backgroundImages: BackgroundImages = [
  { name: "20240928_133346.jpg", overwrite_vertical: 60 },
  { name: "GhhFLraacAE2bym.jpg" },
  { name: "106407887_p0.png" },
  { name: "Screenshot_20250115_063104_Gallery.jpg", overwrite_vertical: -180 },
  { name: "Screenshot 2024-11-13 193219.png" },
  { name: "124516895_p0.png" },
  { name: "113810244_p0.jpg" },
  { name: "20250120_071310.jpg", overwrite_vertical: 5 },
];

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
`;

export default function SocialsPage() {
  const [bgIndex, setBgIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const buttonHeight = 80;
  const buttonWidth = 420;
  const totalButtons = buttons.length;

  const totalHeight = buttonHeight * totalButtons;
  const totalWidth = buttonWidth;

  function cycleBackground() {
    const newBgIndex = (bgIndex + 1) % backgroundImages.length;
    document.cookie = `bg=${newBgIndex}; max-age=31536000; path=/`;
    setBgIndex(newBgIndex);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 200);
  }

  useEffect(() => {
    const bgCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("bg="));
    if (!bgCookie) {
      document.cookie = `bg=0; max-age=31536000; path=/`;
      setBgIndex(0);
    } else {
      const bgIndex = parseInt(bgCookie.split("=")[1]);
      if (bgIndex >= backgroundImages.length || bgIndex < 0) {
        setBgIndex(0);
      } else {
        setBgIndex(bgIndex);
      }
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = `/images/wife/${backgroundImages[bgIndex].name}`;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, [bgIndex]);

  if (!imageSize) return null;

  return (
    <Center mt={4}>
      <VStack spacing={1}>
        {buttons.map((button, index) => {
          const image = new Image();
          image.src = `/images/wife/${backgroundImages[bgIndex].name}`;
          const imgWidth = image.width;
          const imgHeight = image.height;

          const scaleHeight = totalHeight / imgHeight;
          const scaleWidth = totalWidth / imgWidth;
          const scale = Math.max(scaleHeight, scaleWidth);

          const backgroundSize = `${imgWidth * scale}px ${imgHeight * scale}px`;

          const horizontalOffset = Math.max(
            0,
            (imgWidth * scale - totalWidth) / 2
          );
          const verticalOffset = Math.max(
            0,
            (imgHeight * scale - totalHeight) / 2
          );

          return (
            <SocialsButton
              key={index}
              icon={button.icon}
              name={button.name}
              url={button.url as string}
              bg={`/images/wife/${backgroundImages[bgIndex].name}`}
              backgroundPosition={`-${horizontalOffset}px -${
                verticalOffset +
                index * buttonHeight +
                (Number(backgroundImages[bgIndex].overwrite_vertical)
                  ? Number(backgroundImages[bgIndex].overwrite_vertical)
                  : 0)
              }px`}
              backgroundSize={backgroundSize}
            />
          );
        })}
        <NiceBox
          as={"button"}
          onClick={() => cycleBackground()}
          w={"100%"}
          p={3}
          mt={2}
          _hover={{ cursor: "pointer", boxShadow: "glow" }}
          _active={{ transform: "scale(0.95)" }}
        >
          <Center>
            <Box
              as={FiRefreshCcw}
              size={"26px"}
              animation={isRotating ? `${rotate} 200ms linear` : "none"}
            />
          </Center>
        </NiceBox>
      </VStack>
    </Center>
  );
}
