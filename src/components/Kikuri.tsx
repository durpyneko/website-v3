import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useCookiePoller from "./hooks/useCookiePoller";

export default function Kikuri() {
  const [mousePosition, setMousePosition] = useState({ x: 83, y: 83 });
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });

  const [popC, setPopC] = useState<number>();
  const popCookie = useCookiePoller("pop");

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const followCursor = () => {
      setBoxPosition((prevPosition) => {
        const dx = mousePosition.x - prevPosition.x;
        const dy = mousePosition.y - prevPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // px
        if (distance <= 70) {
          return prevPosition;
        }

        const speed = 0.1;
        return {
          x: prevPosition.x + dx * speed,
          y: prevPosition.y + dy * speed,
        };
      });
    };

    const animationFrame = requestAnimationFrame(followCursor);

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, boxPosition]);

  useEffect(() => {
    setPopC(Number(popCookie));
  }, [popCookie]);

  return (
    <Box
      position="absolute"
      left={`${boxPosition.x}px`}
      top={`${boxPosition.y}px`}
      transform="translate(-50%, -50%)"
      pointerEvents="none"
      display={popC ? "block" : "none"}
      zIndex={1000}
    >
      <Image borderRadius={3} boxSize={"50px"} src="/images/wife/crop.jpg" />
    </Box>
  );
}
