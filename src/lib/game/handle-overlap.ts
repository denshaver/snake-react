import type { Entity } from "../../types/entities";
import { getSnakeParts } from "./get-snake-parts";
import { sortEntitiesById } from "./sort-entities-by-id";

export const handleOverlap = (entities: Entity[], overlapEntity: Entity) => {
  const filteredEntities = entities.filter((e) => e.id !== overlapEntity.id);
  const sortedEntities = sortEntitiesById(filteredEntities);
  const snakeParts = getSnakeParts(sortedEntities);

  const newPart: Entity = {
    id: `snake-${snakeParts.length + 1}`,
    position: overlapEntity.position,
    type: "snake",
  };

  return [...sortedEntities, newPart];
};
