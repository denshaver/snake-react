import type { GameMode } from "../../types/game";

export const handleGameMode = (mode: string | null): GameMode => {
  if (!mode) {
    return "easy";
  }

  if (mode !== "easy" && mode !== "hard") {
    return "easy";
  }

  return mode as GameMode;
};
