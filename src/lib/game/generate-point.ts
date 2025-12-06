import type { Entity, Position } from "../../types/entities";
import { getRandomCoordinate } from "../position/get-random-coordinate";
import { checkOverlap } from "./check-overlap";

export const generatePoint = (entities: Entity[], maxPosition: number) => {
  let isValid = false;
  let point: Entity = {
    type: "point",
    id: "point-x-y",
    position: [0, 0],
  };

  do {
    const newPosition: Position = [
      getRandomCoordinate(maxPosition),
      getRandomCoordinate(maxPosition),
    ];
    const [xCoordinate, yCoordinate] = newPosition;

    const overlapEntity = checkOverlap(entities, newPosition);

    if (!overlapEntity) {
      isValid = true;
      point = {
        id: `point-${xCoordinate}-${yCoordinate}`,
        type: "point",
        position: [xCoordinate, yCoordinate],
      };
    }
  } while (!isValid);

  return point;
};
