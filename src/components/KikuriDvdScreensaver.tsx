import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function KikuriDvdScreensaver() {
  const [boxPosition, setBoxPosition] = useState({ x: 100, y: 100 }); // start somewhere
  const [velocity, setVelocity] = useState({ dx: 2, dy: 2 });

  useEffect(() => {
    const moveBox = () => {
      setBoxPosition((prevPosition) => {
        const newPosition = {
          x: prevPosition.x + velocity.dx,
          y: prevPosition.y + velocity.dy,
        };

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let newDx = velocity.dx;
        let newDy = velocity.dy;

        // ! She is still escaping containment, I don't know why
        if (newPosition.x <= 0 || newPosition.x + 100 >= windowWidth) {
          newDx = -newDx - 3;
          newDy += Math.random() * 2 - 1;
        }

        if (newPosition.y <= 0 || newPosition.y + 100 >= windowHeight) {
          newDy = -newDy - 3;
          newDx += Math.random() * 2 - 1;
        }

        const magnitude = Math.sqrt(newDx * newDx + newDy * newDy);
        const fixedSpeed = 2;
        newDx = (newDx / magnitude) * fixedSpeed;
        newDy = (newDy / magnitude) * fixedSpeed;

        setVelocity({ dx: newDx, dy: newDy });

        return newPosition;
      });
    };

    const animationFrame = requestAnimationFrame(moveBox);
    return () => cancelAnimationFrame(animationFrame);
  }, [velocity]);

  return (
    <Box
      position="absolute"
      boxSize="100px"
      left={`${boxPosition.x}px`}
      top={`${boxPosition.y}px`}
      zIndex={1000}
    >
      <Image src="/images/wife/20241016_065105.jpg" />
    </Box>
  );
}
