import { useEffect, useState } from "react";
import type { Entity, Position } from "../types/entities";
import useControls from "./useControls";
import useTimer from "./useTimer";
import { getStartingPoint } from "../lib/position/get-starting-point";
import { handleMovement } from "../lib/position/handle-movement";
import { checkOverlap } from "../lib/game/check-overlap";
import { handleOverlap } from "../lib/game/handle-overlap";
import { generatePoint } from "../lib/game/generate-point";
import type { GameMode } from "../types/game";

export const gameSettings = {
  maxPosition: 20,
  delaysOptions: {
    easy: 250,
    hard: 120,
  },
  xpPerPoint: 10,
};

const startHead: Entity = {
  id: "snake-0",
  type: "snake",
  position: [
    getStartingPoint(gameSettings.maxPosition),
    getStartingPoint(gameSettings.maxPosition),
  ],
};

export default function useGame(mode: GameMode) {
  const delayMs = gameSettings.delaysOptions[mode] || 250;

  const snakeTimer = useTimer(delayMs);
  const pointsTimer = useTimer(delayMs * 20);

  const { direction, unlockControls } = useControls();

  const [isGameOver, setIsGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [count, setCount] = useState(0);
  const [entities, setEntities] = useState<Entity[]>([startHead]);

  const head = entities.find((e) => e.id === "snake-0");

  if (!head) {
    return null;
  }

  const onMovement = () => {
    const { newEntities, newHead } = handleMovement(
      entities,
      head.position,
      direction
    );

    onOverlap(newEntities, newHead.position);
    unlockControls();
  };

  const onOverlap = (entities: Entity[], headPosition: Position) => {
    const overlapEntity = checkOverlap(
      entities.filter((e) => e.id !== "snake-0"),
      headPosition
    );

    if (overlapEntity) {
      if (overlapEntity.type === "snake") {
        return setIsGameOver(true);
      }

      const newEntities = handleOverlap(entities, overlapEntity);

      setEntities(newEntities);
      setCount((prev) => prev + gameSettings.xpPerPoint);
    } else {
      setEntities(entities);
    }
  };

  const handlePointGeneration = () => {
    const point = generatePoint(entities, gameSettings.maxPosition);
    setEntities((prev) => [...prev, point]);
  };

  const togglePause = () => {
    setIsPause((p) => !p);
  };

  useEffect(() => {
    if (snakeTimer === 0 || isGameOver || isPause) return;
    onMovement();
  }, [snakeTimer]);

  useEffect(() => {
    if (pointsTimer === 0 || isGameOver || isPause) return;
    handlePointGeneration();
  }, [pointsTimer]);

  return { entities, count, togglePause, isGameOver, isPause };
}
