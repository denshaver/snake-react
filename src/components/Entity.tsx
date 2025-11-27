import type { IEntity } from "../types/entities";

interface IEntityProps {
  entity: IEntity;
}

export default function Entity({ entity }: IEntityProps) {
  return (
    <div
      className={entity.type === "snake" ? "player" : "point"}
      style={{
        gridArea: `${entity.position[0]} / ${entity.position[1]} / span 1 / span 1`,
      }}
    />
  );
}
