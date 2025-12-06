import type { Entity } from "../../types/entities";

export const getSnakeParts = (entities: Entity[]) => {
  return entities.filter((e) => e.type === "snake" && e.id !== "snake-0");
};
