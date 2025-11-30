import type { IEntity } from "../types/entities";
import type { Axis, Direction } from "../types/positions";

export function validateNewCoordinate(
  coordinate: number,
  max_position: number
) {
  if (coordinate > max_position) {
    return 1;
  } else if (coordinate < 1) {
    return max_position;
  }
  return coordinate;
}

export function handleNewHead(
  oldXCoordinate: number,
  oldYCoordinate: number,
  newCoordinate: number,
  axis: Axis
): IEntity {
  return {
    id: "snake-0",
    type: "snake",
    position:
      axis === "x"
        ? [newCoordinate, oldYCoordinate]
        : [oldXCoordinate, newCoordinate],
  };
}

export function getNewCoordinate(
  direction: Direction,
  xCoordinate: number,
  yCoordinate: number
) {
  let coordinate = 1;
  let axis: Axis = "x";

  switch (direction) {
    case "up":
      coordinate = xCoordinate - 1;
      axis = "x";
      break;
    case "down":
      coordinate = xCoordinate + 1;
      axis = "x";
      break;
    case "left":
      coordinate = yCoordinate - 1;
      axis = "y";
      break;
    case "right":
      coordinate = yCoordinate + 1;
      axis = "y";
      break;
  }

  return { coordinate, axis };
}
