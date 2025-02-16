import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function KikuriDvdScreensaver() {
  const [boxPosition, setBoxPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ dx: 2, dy: 2 });

  useEffect(() => {
    const moveBox = () => {
      setBoxPosition((prevPosition) => {
        let { x, y } = prevPosition;
        let { dx, dy } = velocity;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const boxSize = 100;

        let newDx = dx;
        let newDy = dy;

        if (x + newDx <= 0 || x + newDx + boxSize >= windowWidth) {
          newDx = -newDx;
          newDx += Math.random() * 2 - 1;
        }

        if (y + newDy <= 0 || y + newDy + boxSize >= windowHeight) {
          newDy = -newDy;
          newDy += Math.random() * 2 - 1;
        }

        const magnitude = Math.sqrt(newDx * newDx + newDy * newDy);
        const fixedSpeed = 2;
        newDx = (newDx / magnitude) * fixedSpeed;
        newDy = (newDy / magnitude) * fixedSpeed;

        setVelocity({ dx: newDx, dy: newDy });

        return { x: x + newDx, y: y + newDy };
      });
    };

    const animationFrame = requestAnimationFrame(moveBox);
    return () => cancelAnimationFrame(animationFrame);
  }, [boxPosition]);

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
