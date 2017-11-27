const superagent = require('superagent');

export const sendMessage = async message => {
  console.log(5, message);
  const msgResult = await superagent.get('/wit/message').query(message);
  console.log(6,msgResult)
  return msgResult;
};