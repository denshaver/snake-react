export type EntityType = "snake" | "food";

export interface IEntity {
  type: EntityType;
  id: string;
  position: [number, number];
}
