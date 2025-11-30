import type { IEntity } from "../types/entities";
import type { Axis } from "../types/positions";

export function sortEntitiesById(entities: IEntity[]) {
  return entities.sort((a, b) => a.id.localeCompare(b.id));
}

export function getSnakeParts(entities: IEntity[]) {
  return entities.filter((e) => e.type === "snake" && e.id !== "snake-0");
}

export function createNewHeadObject(
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
