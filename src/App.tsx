import { useEffect, useState } from "react";
import useTimer from "./hooks/useTimer";
import useControls from "./hooks/useControls";
import type { IEntity } from "./types/entities";
import {
  getNewCoordinate,
  handleNewHeadCoordinate,
  validateNewCoordinate,
} from "./lib/movement";
import Entity from "./components/Entity";
import { generatePointEntity } from "./lib/points";

const max_position = 15;
const startPoint = Math.round(max_position / 2);
const moveTimeoutInMs = 500;

export default function App() {
  const timer = useTimer(moveTimeoutInMs);
  const pointsTimer = useTimer(moveTimeoutInMs * 5);
  const direction = useControls();

  const [entities, setEntities] = useState<IEntity[]>([
    {
      id: "snake-0",
      position: [startPoint, startPoint],
      type: "snake",
    },
  ]);

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
    const newEntities = handleNewHeadCoordinate(entities, newCoordinate, axis);
    setEntities(newEntities);
  };

  const handlePointGeneration = () => {
    if (timer === 0) return;
    const point = generatePointEntity(entities, max_position);
    setEntities((prev) => [...prev, point]);
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
            return <Entity entity={entity} />;
          })}
        </div>
      </div>
    </>
  );
}
