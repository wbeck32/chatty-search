const superagent = require('superagent');

export const submitMessage = async message => {
  const msgResult = await superagent.get('/wit/message').query(message);
  const entity = Object.keys(msgResult.body);
  const val = Object.values(msgResult.body)[0];
  const { value } = val[0];
  const messageToAdd = { entity: entity[0], value: value };
  return messageToAdd;
};
