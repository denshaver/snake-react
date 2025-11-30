import type { IEntity } from "../types/entities";
import type { Axis, Direction } from "../types/positions";
import { createNewHeadObject, getSnakeParts, sortEntitiesById } from "./snake";

function validateNewCoordinate(coordinate: number, max_position: number) {
  if (coordinate > max_position) {
    return 1;
  } else if (coordinate < 1) {
    return max_position;
  }
  return coordinate;
}

function getNewCoordinate(
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

export function generateNewHead(
  direction: Direction,
  xCoordinate: number,
  yCoordinate: number,
  max_position: number
) {
  const { coordinate, axis } = getNewCoordinate(
    direction,
    xCoordinate,
    yCoordinate
  );
  const newCoordinate = validateNewCoordinate(coordinate, max_position);
  const newHeadObject = createNewHeadObject(
    xCoordinate,
    yCoordinate,
    newCoordinate,
    axis
  );

  return newHeadObject;
}

export function handleSnakePartsMovement(
  entities: IEntity[],
  headX: number,
  headY: number
) {
  let prevPartPosition: [number, number] = [headX, headY];
  const newSnakeParts: IEntity[] = [];
  const sortedEntities = sortEntitiesById(entities);
  const snakeParts = getSnakeParts(sortedEntities);

  snakeParts.forEach((part) => {
    newSnakeParts.push({
      ...part,
      position: prevPartPosition,
    });
    prevPartPosition = part.position;
  });

  return newSnakeParts;
}
