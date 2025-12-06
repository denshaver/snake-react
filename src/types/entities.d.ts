export type Position = [number, number];

export type EntityType = "snake" | "point";

export interface Entity {
  type: EntityType;
  id: string;
  position: Position;
}
