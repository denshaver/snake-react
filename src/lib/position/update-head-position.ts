import type { Position, Entity } from "../../types/entities";
import type { Axis } from "../../types/positions";

export const updateHeadPosition = (
  headPosition: Position,
  newCoordinate: number,
  axis: Axis
): Entity => {
  const [headX, headY] = headPosition;

  return {
    id: "snake-0",
    type: "snake",
    position: axis === "x" ? [newCoordinate, headY] : [headX, newCoordinate],
  };
};
