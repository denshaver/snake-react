export type EntityType = "snake" | "point";

export interface IEntity {
  type: EntityType;
  id: string;
  position: [number, number];
}
