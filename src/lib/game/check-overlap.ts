import type { Entity, Position } from "../../types/entities";

export const checkOverlap = (
  entities: Entity[],
  position: Position
): Entity | undefined => {
  const [xCoordinate, yCoordinate] = position;

  const overlapEntity = entities.find((entity) => {
    return (
      entity.position[0] === xCoordinate && entity.position[1] === yCoordinate
    );
  });

  return overlapEntity;
};
