import { useState, useEffect } from "react";
import useControls from "../hooks/useControls";
import useTimer from "../hooks/useTimer";
import { generateNewHead, handleSnakePartsMovement } from "../lib/movement";
import { generatePointEntity } from "../lib/points";
import { sortEntitiesById, getSnakeParts } from "../lib/snake";
import type { IEntity } from "../types/entities";
import Entity from "./Entity";
import type { GameMode } from "../types/layout";
import Overlay from "./Overlay";

const max_position = 20;
const startPoint = Math.round(max_position / 2);
const delaysOptions = {
  easy: 250,
  hard: 120,
};
const xpPerPoint = 10;
const startHead: IEntity = {
  id: "snake-0",
  position: [startPoint, startPoint],
  type: "snake",
};

export interface IGameProps {
  mode: GameMode;
  handleReturnToMenu: () => void;
}

export default function Game({ mode, handleReturnToMenu }: IGameProps) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [count, setCount] = useState(0);
  const [entities, setEntities] = useState<IEntity[]>([startHead]);

  const delayMs = delaysOptions[mode] || 250;
  const timer = useTimer(delayMs);
  const pointsTimer = useTimer(delayMs * 20);
  const { direction, unlockControls } = useControls();

  const head = entities.find((e) => e.id === "snake-0");

  if (!head) {
    return <h2>Something went wrong</h2>;
  }

  const [xCoordinate, yCoordinate] = head.position;

  const handleMovement = () => {
    if (timer === 0 || isGameOver || isPause) return;

    const newHead = generateNewHead(
      direction,
      xCoordinate,
      yCoordinate,
      max_position
    );
    const newSnakeParts = handleSnakePartsMovement(
      entities,
      xCoordinate,
      yCoordinate
    );
    const points = entities.filter((e) => e.type === "point");

    const newEntities = sortEntitiesById([
      newHead,
      ...newSnakeParts,
      ...points,
    ]);

    setEntities(newEntities);
    checkPointsOverlap(...newHead.position);
    unlockControls();
  };

  const handlePointGeneration = () => {
    if (timer === 0 || isGameOver || isPause) return;
    const point = generatePointEntity(entities, max_position);
    setEntities((prev) => [...prev, point]);
  };

  const checkPointsOverlap = (headX: number, headY: number) => {
    const overlapEntity = entities.find((entity) => {
      return entity.position[0] === headX && entity.position[1] === headY;
    });

    if (overlapEntity) {
      if (overlapEntity.type === "snake") {
        return setIsGameOver(true);
      }

      setEntities((prev) => {
        const sortedEntities = sortEntitiesById(prev);
        const snakeParts = getSnakeParts(sortedEntities);
        const newPart: IEntity = {
          id: `snake-${snakeParts.length + 1}`,
          position: overlapEntity.position,
          type: "snake",
        };
        return [
          ...sortedEntities.filter((e) => e.id !== overlapEntity.id),
          newPart,
        ];
      });
      setCount((prev) => prev + xpPerPoint);
    }
  };

  useEffect(() => {
    handleMovement();
  }, [timer]);

  useEffect(() => {
    handlePointGeneration();
  }, [pointsTimer]);
  return (
    <>
      <div
        className="viewbox"
        style={{
          gridTemplate: `repeat(${max_position}, 1fr) / repeat(${max_position}, 1fr)`,
        }}
        onClick={() => setIsPause((prev) => !prev)}
      >
        {entities.map((entity) => {
          return <Entity key={entity.id} entity={entity} />;
        })}
        {(isGameOver || isPause) && (
          <Overlay
            isPause={isPause}
            isGameOver={isGameOver}
            handleReturnToMenu={handleReturnToMenu}
          />
        )}
      </div>
      <div className="footer">
        <h2>Mode: {mode}</h2>
        <h2>{count} xp</h2>
      </div>
    </>
  );
}
