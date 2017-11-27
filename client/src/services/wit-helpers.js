const readline = require('linebyline')

export function firstEntity(result) {
  const entity = Object.keys(result);
  const val = Object.values(result)[0];
  const { value } = val[0];
  const msg = { entity: entity[0], value: value };
  return msg
}
