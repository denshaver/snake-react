import { useState } from "react";

export default function useGameStatus(xpPerPoint: number) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleUpscore = () => {
    setScore((prev) => prev + xpPerPoint);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  return { score, isGameOver, handleUpscore, handleGameOver };
}
