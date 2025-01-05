import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface NiceBoxProps extends BoxProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function NiceBox({ children, ...rest }: NiceBoxProps) {
  return (
    <Box
      /* width={["100%", "450px", "450px"]} */
      /* minHeight={["30px", "40px", "50px"]} */
      borderRadius="10px"
      bgColor="bg"
      padding="20px"
      borderColor={"border"}
      borderWidth={2}
      fontSize={["15px", "16px", "18px"]}
      boxShadow={"shadow"}
      {...rest}
    >
      <Box>{children}</Box>
    </Box>
  );
}
