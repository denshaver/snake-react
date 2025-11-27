import { useEffect, useState } from "react";
import type { Direction } from "../types/positions";

export default function useControls() {
  const [direction, setDirection] = useState<Direction>("up");

  function handleDirectionChange(event: globalThis.KeyboardEvent) {
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

    if (!allowedKeys.includes(pressedKey)) return;

    switch (pressedKey) {
      case "w":
      case "ArrowUp":
        if (direction === "down") return;
        return setDirection("up");
      case "s":
      case "ArrowDown":
        if (direction === "up") return;
        return setDirection("down");
      case "a":
      case "ArrowLeft":
        if (direction === "right") return;
        return setDirection("left");
      case "d":
      case "ArrowRight":
        if (direction === "left") return;
        return setDirection("right");
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleDirectionChange);

    return () => {
      document.removeEventListener("keydown", handleDirectionChange);
    };
  }, [direction]);

  return direction;
}
