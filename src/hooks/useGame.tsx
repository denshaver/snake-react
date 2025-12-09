import { useCallback, useEffect, useState } from "react";
import type { Entity } from "../types/entities";
import useControls from "./useControls";
import { handleMovement } from "../lib/position/handle-movement";
import { checkOverlap } from "../lib/game/check-overlap";
import { handleOverlap } from "../lib/game/handle-overlap";
import { generatePoint } from "../lib/game/generate-point";
import type { GameMode } from "../types/game";
import { generateSnake } from "../lib/game/generate-snake";
import useGameTimers from "./useGameTimers";
import useGameStatus from "./useGameStatus";

export const gameSettings = {
  maxPosition: 20,
  delaysOptions: {
    easy: 250,
    hard: 100,
  },
  xpPerPoint: 10,
};

export default function useGame(mode: GameMode) {
  const delayMs = gameSettings.delaysOptions[mode] || 250;
  const { snakeTimer, pointsTimer, pauseAll, togglePause, isPause } =
    useGameTimers(delayMs);
  const { score, isGameOver, handleUpscore, handleGameOver } = useGameStatus(
    gameSettings.xpPerPoint
  );

  const { direction, unlockControls } = useControls();
  const [entities, setEntities] = useState<Entity[]>(
    generateSnake(gameSettings.maxPosition, 3)
  );

  const head = entities.find((e) => e.id === "snake-0");

  if (!head) {
    throw new Error("Head not found in useGame");
  }

  const onMovement = useCallback(() => {
    const { newEntities, newHead } = handleMovement(entities, direction);

    const overlapEntity = checkOverlap(
      newEntities.filter((e) => e.id !== "snake-0"),
      newHead.position
    );

    if (overlapEntity) {
      if (overlapEntity.type === "snake") {
        handleGameOver();
        pauseAll();
        return;
      }

      const overlapEntities = handleOverlap(newEntities, overlapEntity);
      setEntities(overlapEntities);

      handleUpscore();
    } else {
      setEntities(newEntities);
    }

    unlockControls();
  }, [entities, direction]);

  useEffect(() => {
    if (snakeTimer === 0 || isGameOver || isPause) return;

    onMovement();
  }, [snakeTimer]);

  useEffect(() => {
    if (pointsTimer === 0 || isGameOver || isPause) return;

    const point = generatePoint(entities, gameSettings.maxPosition);
    setEntities((prev) => [...prev, point]);
  }, [pointsTimer]);

  return { entities, score, togglePause, isGameOver, isPause };
}
