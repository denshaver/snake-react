import { useEffect, useState } from "react";
import useTimer from "./hooks/useTimer";
import useControls from "./hooks/useControls";
import type { IEntity } from "./types/entities";
import {
  getNewCoordinate,
  handleNewHead,
  validateNewCoordinate,
} from "./lib/movement";
import Entity from "./components/Entity";
import { generatePointEntity } from "./lib/points";

const max_position = 15;
const startPoint = Math.round(max_position / 2);
const delayMs = 200;

export default function App() {
  const [count, setCount] = useState(0);
  const [entities, setEntities] = useState<IEntity[]>([
    {
      id: "snake-0",
      position: [startPoint, startPoint],
      type: "snake",
    },
  ]);

  const timer = useTimer(delayMs);
  const pointsTimer = useTimer(delayMs * 10);
  const { direction, unlockControls } = useControls();

  const head = entities.find((e) => e.id === "snake-0");

  if (!head) {
    return <h2>Something went wrong</h2>;
  }

  const [xCoordinate, yCoordinate] = head.position;

  const handleMovement = () => {
    if (timer === 0) return;

    const { coordinate, axis } = getNewCoordinate(
      direction,
      xCoordinate,
      yCoordinate
    );
    const newCoordinate = validateNewCoordinate(coordinate, max_position);
    const newHeadObject = handleNewHead(
      xCoordinate,
      yCoordinate,
      newCoordinate,
      axis
    );
    checkOverlap(...newHeadObject.position);
    setEntities((prev) =>
      prev.map((e) => (e.id === "snake-0" ? newHeadObject : e))
    );
    unlockControls();
  };

  const handlePointGeneration = () => {
    if (timer === 0) return;
    const point = generatePointEntity(entities, max_position);
    setEntities((prev) => [...prev, point]);
  };

  const checkOverlap = (headX: number, headY: number) => {
    const overlapEntity = entities.find((entity) => {
      return (
        entity.type === "point" &&
        entity.position[0] === headX &&
        entity.position[1] === headY
      );
    });

    if (overlapEntity) {
      setEntities((prev) => {
        return prev.filter((e) => e.id !== overlapEntity.id);
      });
      setCount((prev) => prev + 1);
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
      <div className="container">
        <div
          className="viewbox"
          style={{
            gridTemplate: `repeat(${max_position}, 1fr) / repeat(${max_position}, 1fr)`,
          }}
        >
          {entities.map((entity) => {
            return <Entity key={entity.id} entity={entity} />;
          })}
        </div>
        <h2>Count: {count}</h2>
      </div>
    </>
  );
}
