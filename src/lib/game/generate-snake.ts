import type { Entity } from "../../types/entities";
import { getStartingPoint } from "../position/get-starting-point";

export const generateSnake = (
  maxPosition: number,
  length: number = 1
): Entity[] => {
  const startingPoint = getStartingPoint(maxPosition);
  const entities: Entity[] = [];

  for (let i = 0; i < length; i++) {
    entities.push({
      id: `snake-${i}`,
      type: "snake",
      position: [startingPoint + i, startingPoint],
    });
  }

  return entities;
};
