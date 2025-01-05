import { useState } from "react";
import { Box, Center, Image, Spinner, Text, VStack } from "@chakra-ui/react";

const ImageWithSpinner = ({
  src,
  alt,
  maxW,
}: {
  src: any;
  alt: any;
  maxW: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false); // In case of an error, stop loading and hide the spinner
  };

  return (
    <Box position="relative">
      {isLoading && (
        <Center
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex={10}
          bg="rgba(255, 255, 255, 0.8)"
        >
          <Spinner size="lg" />
        </Center>
      )}
      <Image
        pt={10}
        src={src}
        alt={alt}
        maxW={maxW}
        onLoad={handleImageLoad}
        onError={handleImageError}
        display={isLoading ? "none" : "block"}
      />
    </Box>
  );
};

export default function Home() {
  return <Box></Box>;
}
