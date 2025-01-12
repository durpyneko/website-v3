import SocialsButton from "@/components/SocialsButton";
import { Center, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import {
  RiDiscordFill,
  RiGithubFill,
  RiSteamFill,
  RiTwitterXLine,
} from "react-icons/ri";
import { SiAnilist } from "react-icons/si";

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

export default function SocialsPage() {
  return (
    <Center mt={4}>
      <VStack spacing={2}>
        {buttons.map((button, index) => (
          <SocialsButton
            key={index}
            icon={button.icon}
            name={button.name}
            url={button.url as string}
            backgroundPosition={`0 -${index * 80}px`}
          />
        ))}
      </VStack>
    </Center>
  );
}
