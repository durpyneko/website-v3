import { Box } from "@chakra-ui/react";

export default function CustomBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      position="relative"
      minWidth="350px"
      minHeight="40px"
      borderRadius="10px"
      bgColor="rgba(100,100,100,0.3)"
      padding="20px"
      display="flex"
      borderColor={"whiteAlpha.300"}
      borderWidth={2}
      justifyContent="center"
      alignItems="center"
      fontWeight="bold"
      fontFamily="sans-serif"
      zIndex={2}
      overflow="hidden"
    >
      <Box position="relative" zIndex={3}>
        {children}
      </Box>

      <Box
        position="absolute"
        zIndex={-2}
        left="0px"
        top="0px"
        width="100%"
        height="100%"
        borderRadius="30%"
        /* width="300%"
        height="400%"
        borderRadius="60%" */
        border="5px solid transparent"
        backgroundImage="linear-gradient(#ff66ab, #ff66ab)"
        backgroundSize="100% 100%"
        backgroundPosition="0 0, 100% 0, 100% 100%, 0 100%"
        animation="rotate 15s linear infinite"
        boxSizing="border-box"
      />

      <Box
        position="absolute"
        zIndex={-1}
        backdropFilter={"blur(10px)"}
        w={"100%"}
        h={"100%"}
      ></Box>

      <Box
        position="absolute"
        zIndex={0}
        left="6px"
        top="6px"
        width="calc(100% - 12px)"
        height="calc(100% - 12px)"
        background="rgba(40,40,40,0.9)" // rgb(39, 39, 39)
        borderRadius="8px"
        backdropFilter={"blur(10px)"}
      />
    </Box>
  );
}
