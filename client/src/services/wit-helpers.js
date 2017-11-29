export function firstEntity(result) {
  const val = Object.values(result)[0];
  const entity = val[0]._entity;
  const msg = { entity: entity };
  return msg
}
