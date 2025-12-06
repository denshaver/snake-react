import type { Entity } from "../types/entities";
import EntityItem from "./Entity";

export default function EntitiesList({ entities }: { entities: Entity[] }) {
  return entities.map((entity) => {
    return <EntityItem key={entity.id} entity={entity} />;
  });
}
