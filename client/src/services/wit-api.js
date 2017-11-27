const superagent = require('superagent');

export const sendMessage = async message => {
  console.log(5, message);
  const msgResult = await superagent.get('/wit/message').query(message);
  msgResult.body.search_term ? console.log('search', msgResult.body.search_term[0].value) : console.log('not');
  return msgResult;
};