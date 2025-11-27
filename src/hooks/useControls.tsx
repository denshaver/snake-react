import { useEffect, useState } from "react";

export type Direction = "right" | "left" | "up" | "down";

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
        return setDirection("up");
      case "s":
      case "ArrowDown":
        return setDirection("down");
      case "a":
      case "ArrowLeft":
        return setDirection("left");
      case "d":
      case "ArrowRight":
        return setDirection("right");
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleDirectionChange);

    return () => {
      document.removeEventListener("keydown", handleDirectionChange);
    };
  }, []);

  return direction;
}
