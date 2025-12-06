import type { Entity } from "../../types/entities";

export const getPoints = (entities: Entity[]) => {
  return entities.filter((e) => e.type === "point");
};
