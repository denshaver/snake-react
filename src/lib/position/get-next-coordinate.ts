import type { Position } from "../../types/entities";
import type { Direction, Axis } from "../../types/positions";

export const getNextCoordinate = (
  direction: Direction,
  headPosition: Position
): { coordinate: number; axis: Axis } => {
  const [headX, headY] = headPosition;

  if (direction === "up") {
    return { coordinate: headX - 1, axis: "x" };
  }
  if (direction === "down") {
    return { coordinate: headX + 1, axis: "x" };
  }
  if (direction === "left") {
    return { coordinate: headY - 1, axis: "y" };
  }

  return { coordinate: headY + 1, axis: "y" };
};
