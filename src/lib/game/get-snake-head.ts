import type { Entity } from "../../types/entities";

export const getSnakeHead = (entities: Entity[]): Entity => {
  const oldHead = entities.find((e) => e.id === "snake-0");

  if (!oldHead) {
    throw new Error("Snake head not found");
  }

  return oldHead;
};
