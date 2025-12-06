import type { Position } from "../../types/entities";
import type { Direction } from "../../types/positions";
import { getNextCoordinate } from "./get-next-coordinate";
import { updateHeadPosition } from "./update-head-position";
import { validateCoordinate } from "./validate-coordinate";

export function handleSnakeHeadPosition(
  direction: Direction,
  headPosition: Position,
  maxPosition: number
) {
  const { coordinate, axis } = getNextCoordinate(direction, headPosition);

  const newCoordinate = validateCoordinate(coordinate, maxPosition);

  const updatedHead = updateHeadPosition(headPosition, newCoordinate, axis);

  return updatedHead;
}
