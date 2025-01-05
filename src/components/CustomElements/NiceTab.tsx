import { Tab, TabProps } from "@chakra-ui/react";
import React from "react";

interface NiceTabProps extends TabProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function NiceTab({ isActive, children, ...rest }: NiceTabProps) {
  return (
    <Tab
      borderRadius="10px"
      bgColor={isActive ? "bgSelected" : "bg"}
      _selected={{ bg: "bgSelected", boxShadow: "glow" }}
      padding="6px 12px"
      borderColor={"border"}
      borderWidth={1}
      fontSize={["15px", "16px", "17px"]}
      _hover={{ bgColor: "bgHover", boxShadow: "glow", cursor: "pointer" }}
      boxShadow={"shadow"}
      h={["40px", "45px", "45px"]}
      w={["75px", "80px", "100px"]}
      {...rest}
    >
      {children}
    </Tab>
  );
}
