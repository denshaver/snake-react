import type { Entity } from "../types/entities";

export default function EntityItem({ entity }: { entity: Entity }) {
  return (
    <div
      id={entity.id}
      className={entity.type === "snake" ? "player" : "point"}
      style={{
        gridArea: `${entity.position[0]} / ${entity.position[1]} / span 1 / span 1`,
      }}
    />
  );
}
