import { useCallback, useEffect, useState } from "react";
import type { Entity } from "../types/entities";
import useControls from "./useControls";
import useTimer from "./useTimer";
import { handleMovement } from "../lib/position/handle-movement";
import { checkOverlap } from "../lib/game/check-overlap";
import { handleOverlap } from "../lib/game/handle-overlap";
import { generatePoint } from "../lib/game/generate-point";
import type { GameMode } from "../types/game";
import { generateSnake } from "../lib/game/generate-snake";

export const gameSettings = {
  maxPosition: 20,
  delaysOptions: {
    easy: 250,
    hard: 30,
  },
  xpPerPoint: 10,
};

export default function useGame(mode: GameMode) {
  const delayMs = gameSettings.delaysOptions[mode] || 250;

  const {
    timer: snakeTimer,
    pause: pauseSnakeTimer,
    resume: resumeSnakeTimer,
  } = useTimer(delayMs);
  const {
    timer: pointsTimer,
    pause: pausePointsTimer,
    resume: resumePointsTimer,
  } = useTimer(delayMs * 20);

  const { direction, unlockControls } = useControls();

  const [isGameOver, setIsGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [score, setScore] = useState(0);
  const [entities, setEntities] = useState<Entity[]>(
    generateSnake(gameSettings.maxPosition, 3)
  );

  const head = entities.find((e) => e.id === "snake-0");

  if (!head) {
    throw new Error("Head not found in useGame");
  }

  const onMovement = useCallback(() => {
    const { newEntities, newHead } = handleMovement(
      entities,
      head.position,
      direction
    );

    const overlapEntity = checkOverlap(
      newEntities.filter((e) => e.id !== "snake-0"),
      newHead.position
    );

    if (overlapEntity) {
      if (overlapEntity.type === "snake") {
        pausePointsTimer();
        pauseSnakeTimer();
        return setIsGameOver(true);
      }

      const overlapEntities = handleOverlap(newEntities, overlapEntity);

      setEntities(overlapEntities);
      setScore((prev) => prev + gameSettings.xpPerPoint);
    } else {
      setEntities(newEntities);
    }

    unlockControls();
  }, [entities, direction]);

  const onPointGeneration = () => {
    const point = generatePoint(entities, gameSettings.maxPosition);
    setEntities((prev) => [...prev, point]);
  };

  const togglePause = () => {
    if (isPause) {
      resumePointsTimer();
      resumeSnakeTimer();
      setIsPause(false);
    } else {
      pausePointsTimer();
      pauseSnakeTimer();
      setIsPause(true);
    }
  };

  useEffect(() => {
    if (snakeTimer === 0 || isGameOver || isPause) return;
    onMovement();
  }, [snakeTimer]);

  useEffect(() => {
    if (pointsTimer === 0 || isGameOver || isPause) return;
    onPointGeneration();
  }, [pointsTimer]);

  return { entities, score, togglePause, isGameOver, isPause };
}
