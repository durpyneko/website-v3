import { Tab, TabProps } from "@chakra-ui/react";
import React from "react";

interface NiceTabProps extends TabProps {
  children: React.ReactNode;
  isActive?: boolean;
  [key: string]: any;
}

export default function NiceTab({ isActive, children, ...rest }: NiceTabProps) {
  return (
    <Tab
      borderRadius="10px"
      bgColor={isActive ? "bgSelected" : "bg"}
      _selected={{
        bg: "bgSelected",
        boxShadow: "glow", // 0px 0px 4px 2px rgba(125, 125, 156, 0.4)
        borderColor: "rgba(125, 125, 156, 0.1)",
        borderWidth: "1px",
      }}
      padding="6px 12px"
      borderWidth="0"
      fontSize={["15px", "16px", "17px"]}
      _hover={{
        bgColor: "bgSelected",
        boxShadow: "glow",
        borderColor: "rgba(125, 125, 156, 0.1)",
        borderWidth: "1px",
        cursor: "pointer",
      }}
      boxShadow="none"
      h={["40px", "45px", "45px"]}
      w={["75px", "80px", "100px"]}
      {...rest}
    >
      {children}
    </Tab>
  );
}
