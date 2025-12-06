import { useEffect, useState } from "react";
import type { Direction } from "../types/positions";

export default function useControls() {
  const [direction, setDirection] = useState<Direction>("up");
  const [isBlocked, setIsBlocked] = useState(false);

  const handleDirectionChange = (event: globalThis.KeyboardEvent) => {
    const allowedKeys = [
      "w",
      "a",
      "s",
      "d",
      "ArrowUp",
      "ArrowDown",
      "ArrowRight",
      "ArrowLeft",
    ];
    const pressedKey = event.key;

    if (!allowedKeys.includes(pressedKey) || isBlocked) return;

    setIsBlocked(true);

    if (pressedKey === "w" || pressedKey === "ArrowUp") {
      if (direction === "down") return;
      return setDirection("up");
    }

    if (pressedKey === "s" || pressedKey === "ArrowDown") {
      if (direction === "up") return;
      return setDirection("down");
    }

    if (pressedKey === "a" || pressedKey === "ArrowLeft") {
      if (direction === "right") return;
      return setDirection("left");
    }

    if (pressedKey === "d" || pressedKey === "ArrowRight") {
      if (direction === "left") return;
      return setDirection("right");
    }
  };

  const unlockControls = () => {
    if (isBlocked) setIsBlocked(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDirectionChange);

    return () => {
      document.removeEventListener("keydown", handleDirectionChange);
    };
  }, [direction, isBlocked]);

  return { direction, unlockControls };
}
