import type { Entity, Position } from "../../types/entities";
import { sortEntitiesById, getSnakeParts } from "../snake";

export function handleSnakeBodyPosition(
  entities: Entity[],
  headPosition: Position
) {
  const [headX, headY] = headPosition;

  let prevPartPosition: Position = [headX, headY];
  const newSnakeParts: Entity[] = [];
  const sortedEntities = sortEntitiesById(entities);
  const snakeParts = getSnakeParts(sortedEntities);

  snakeParts.forEach((part) => {
    newSnakeParts.push({
      ...part,
      position: prevPartPosition,
    });
    prevPartPosition = part.position;
  });

  return newSnakeParts;
}
