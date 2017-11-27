import { interactive, firstEntity } from '../services/wit-helpers';
const superagent = require('superagent');

export const submitMessage = async message => {
  const msgResult = await superagent.get('/wit/message').query(message);
  const entity = await firstEntity(msgResult.body)
  return entity;
};

export const handleMessage = async message => {
  const entities = await superagent.get('/wit/message').query(message);
  console.log(99, entities);
  const entity = await firstEntity(entities.body)
   const intent = entity.entity;
  if (!intent) {
    console.log('🤖  Try something else. I got no intent :)');
    return;
  }
  switch (intent) {
    case 'search_term':
      console.log('🤖  Okay, finding some ', entity.value);
      break;
    case 'appt_show':
      console.log('🤖  Sure, showing your appointments');
      break;
    default:
      console.log(`🤖  ${intent.value}`);
      break;
  }
};
// interactive(handleMessage);
