import { gameSettings } from "../../hooks/useGame";
import type { Entity, Position } from "../../types/entities";
import type { Direction } from "../../types/positions";
import { getPoints } from "../game/get-points";
import { sortEntitiesById } from "../game/sort-entities-by-id";
import { handleSnakeBodyPosition } from "./handle-snake-body-position";
import { handleSnakeHeadPosition } from "./handle-snake-head-position";

export const handleMovement = (
  entities: Entity[],
  head: Position,
  direction: Direction
) => {
  const newHead = handleSnakeHeadPosition(
    direction,
    head,
    gameSettings.maxPosition
  );

  const newSnakeParts = handleSnakeBodyPosition(entities, head);

  const points = getPoints(entities);

  const newEntities = sortEntitiesById([newHead, ...newSnakeParts, ...points]);

  return { newEntities, newHead };
};
