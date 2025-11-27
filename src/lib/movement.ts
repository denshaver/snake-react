import type { IEntity } from "../types/entities";
import type { Axis, Direction } from "../types/positions";

export function validateNewCoordinate(
  coordinate: number,
  max_position: number
) {
  if (coordinate >= max_position) {
    return 0;
  } else if (coordinate <= 0) {
    return max_position;
  }
  return coordinate;
}

export function handleNewHeadCoordinate(
  entities: IEntity[],
  coordinate: number,
  axis: Axis
) {
  return entities.map((e) => {
    if (e.id === "snake-0") {
      const newPosition: [number, number] =
        axis === "x"
          ? [coordinate, e.position[1]]
          : [e.position[0], coordinate];
      return { ...e, position: newPosition };
    }
    return e;
  });
}

export function getNewCoordinate(
  direction: Direction,
  xCoordinate: number,
  yCoordinate: number
) {
  let coordinate = 0;
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
