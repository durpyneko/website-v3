import { Box, Center, VStack } from "@chakra-ui/react";
import NiceDivider from "./CustomElements/NiceDivider";

export default function Footer() {
  return (
    <Center mb={4}>
      <VStack w={"100vw"}>
        <NiceDivider />
        <Center>Version: 3.1.1 | &copy; durpyneko</Center>
      </VStack>
      {/* <NiceBox
        position={"fixed"}
        bottom={0}
        maxW={["180px", "210px", "250px"]}
        minH={[5, 6, 8]}
        fontSize={["11px", "13px", "15px"]}
        p={[2, 2, 2]}
        borderBottomRadius={0}
        borderBottomWidth={0}
      >
        <Center>Version: 3.1.0 | &copy; durpyneko</Center>
      </NiceBox> */}
      {/* <Box
        zIndex={-1}
        position={"absolute"}
        bottom={0}
        w={"100%"}
        borderBottomColor={"whiteAlpha.300"}
        borderBottomWidth={2}
      /> */}
    </Center>
  );
}
