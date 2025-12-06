import type { Entity } from "../../types/entities";

export const sortEntitiesById = (entities: Entity[]) => {
  return entities.sort((a, b) => a.id.localeCompare(b.id));
};
