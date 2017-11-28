import { firstEntity } from '../services/wit-helpers';
const superagent = require('superagent');

export const submitMessage = async message => {
  const msgResult = await superagent.get('/wit/message').query(message);
  console.log(11, msgResult)
  const entity = await firstEntity(msgResult.body);
  console.log(12, entity);
  return entity
};

export const handleMessage = async (displayMessages) => {
  console.log(888, displayMessages);
  const tmp = Array.from(displayMessages)
  const currVal = tmp.pop()
  console.log(345,currVal)
  let params = {};
  // const entities = await superagent.get('/wit/message').query(message);
  // console.log(99, entities);
  // const entity = await firstEntity(entities.body);
  // console.log(100, entity)
  const intent = currVal.intent;
  let msg = '';
  if (!intent) {
    console.log('🤖  Try something else. I got no intent :)');
    msg = 'no results';
    return msg;
  }
  console.log(55,intent, params)

  switch (intent) {

    case 'search_term':

      params.search_term = currVal.value;
      msg = {
        value: 'Great! Do you want a new or used ' + params.search_term + '?',
        intent: 'condition'
      };
      return msg;
      break;
    case 'condition':
      params.condition = currVal.value;
      msg = {
        value:
          "Excellent! Let's find you a " +
          params.condition +
          ' ' +
          params.search_term +
          ' Do you want a ' +
          params.search_term +
          ' you can pick up locally or is it OK to have it shipped?',
        entity: 'location_pref'
      };
      break;
    case 'budget':
      params.budget = currVal.value;
      msg = {
        value: 'So you have a budget of ' + params.budget + '.',
        entity: intent
      };
      break;
    case 'location_pref':
      params.location_pref = currVal.value;
      msg = {
        value:
          'So you want to find something ' +
          params.location_pref +
          '. Great. Whats your ZIP code?',
        entity: 'zip_code'
      };
    case 'zip_code':
      params.zip_code = currVal.value;
      msg = {
        value:
          'Thanks for your ZIP code. Just give me a few moments to search.',
        entity: intent
      };
      break;
    default:
      console.log(`🤖  ${intent}`);
      break;
  }
};
