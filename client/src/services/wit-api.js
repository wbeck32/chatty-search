import { checkKeywords } from './ebay-api'
const superagent = require('superagent');

let params = {};

export const submitMessage = async message => {
  const msgResult = await superagent.get('/wit/message').query(message);
  console.log(2, msgResult)
  // const entity = await firstEntity(msgResult.body);
  return msgResult;
};

export const handleMessage = async lastMsg => {

  let msg = '';
  console.log(223, lastMsg)

  if (!lastMsg.intent) {
    console.log('🤖  Try something else. I got no intent :)');
    msg = 'no results';
    return msg;
  }
  switch (lastMsg.intent) {
    case 'greetings':
    msg = {
      value: 'my intent is greetings'
    }
    return msg;
    case 'confirm_keyword':
      msg = {
        value: 'my intent is confirm_keyword'
      }
      return msg;
    case 'search_term':
      params.search_term = lastMsg.value;

      msg = {
        value: 'Great! Do you want a new or used ' + params.search_term + '?',
        intent: 'condition'
      };
      return msg;
    case 'condition':
      params.condition = lastMsg.value;
      msg = {
        value:
          "Excellent! Let's find you a " +
          params.condition +
          ' ' +
          params.search_term +
          ' How much do you want to spend?',
        intent: 'budget'
      };
      return msg;
    case 'budget':
      params.budget = lastMsg.value;
      msg = {
        value: 'So you have a budget of ' + params.budget + '.  Do you want a ' +
        params.search_term +
        ' you can pick up locally or is it OK to have it shipped',
        intent: 'location_pref'
      };
      return msg;
    case 'location_pref':
      params.location_pref = lastMsg.value;
      msg = {
        value:
          'So you want to find something ' +
          params.location_pref +
          '. Great. Whats your ZIP code?',
        intent: 'zip_code'
      };
      return msg;
    case 'zip_code':
      params.zip_code = lastMsg.value;
      msg = {
        value:
          'Thanks for your ZIP code. Just give me a few moments to search.',
        intent: ''
      };
      return msg;
    default:
      console.log(`🤖  ${lastMsg.intent}`);
      break;
  }
};
