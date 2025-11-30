import type { IEntity } from "../types/entities";

function getRandomCoordinate(max: number) {
  return Math.floor(Math.random() * max) + 1; // excluding zero
}

export const generatePointEntity = (
  entities: IEntity[],
  max_position: number
) => {
  let isValid = false;
  let point: IEntity = {
    type: "point",
    id: "point-x-y",
    position: [0, 0],
  };

  do {
    const xCoordinate = getRandomCoordinate(max_position);
    const yCoordinate = getRandomCoordinate(max_position);

    const overlap = entities.some((e) => {
      return e.position[0] === xCoordinate && e.position[1] === yCoordinate;
    });

    if (!overlap) {
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
