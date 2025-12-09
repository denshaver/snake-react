import { gameSettings } from "../../hooks/useGame";
import type { Entity } from "../../types/entities";
import type { Direction } from "../../types/positions";
import { getPoints } from "../game/get-points";
import { getSnakeHead } from "../game/get-snake-head";
import { sortEntitiesById } from "../game/sort-entities-by-id";
import { handleSnakeBodyPosition } from "./handle-snake-body-position";
import { handleSnakeHeadPosition } from "./handle-snake-head-position";

export const handleMovement = (entities: Entity[], direction: Direction) => {
  const oldHead = getSnakeHead(entities);

  const newHead = handleSnakeHeadPosition(
    direction,
    oldHead.position,
    gameSettings.maxPosition
  );

  const newSnakeParts = handleSnakeBodyPosition(entities, oldHead.position);

  const points = getPoints(entities);

  const newEntities = sortEntitiesById([newHead, ...newSnakeParts, ...points]);

  return { newEntities, newHead };
};
