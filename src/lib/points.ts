import type { IEntity } from "../types/entities";

function getRandomCoordinate(max: number) {
  return Math.floor(Math.random() * max);
}

export const generatePointEntity = (
  entities: IEntity[],
  max_position: number
) => {
  let placed = false;
  let point: IEntity = {
    type: "point",
    id: "point-x-y",
    position: [-1, -1],
  };

  do {
    const xCoordinate = getRandomCoordinate(max_position);
    const yCoordinate = getRandomCoordinate(max_position);

    const overlap = entities.some((e) => {
      return e.position[0] === xCoordinate && e.position[1] === yCoordinate;
    });

    if (!overlap) {
      placed = true;
      point = {
        id: `point-${xCoordinate}-${yCoordinate}`,
        type: "point",
        position: [xCoordinate, yCoordinate],
      };
    }
  } while (!placed);

  return point;
};
