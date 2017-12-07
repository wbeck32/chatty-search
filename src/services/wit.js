import { buildDate } from './helpers';
require('dotenv');
const fetch = require('fetch-jsonp');
const querystring = require('querystring');

export const submitMessage = async message => {
  console.log(1, message);
  const context = JSON.stringify({ id: message.intent, doc: message.intent });
  const now = buildDate();
  const v = '20170307';
  const verbose = true;
  const token = process.env.REACT_APP_WIT_CLIENT_TOKEN;
  const query = querystring.stringify({
    q: message.value,
    verbose: verbose,
    v: v,
    context: context,
    access_token: token,
    reference_time: now
  });
  let messageResults = await fetch(`https://api.wit.ai/message?${query}`);
  messageResults = Promise.resolve(messageResults.json()).then(res => {
    return res;
  });
  return messageResults;
};

export const handleMessage = async (displayMessages) => {
  let msg = '';
  let params = {};
  let thisMsg = {}
console.log(121234, displayMessages)
if(displayMessages.length > 0) {
  const tmp = Array.from(displayMessages);
  const thisMsg = tmp.pop();
} else {
  thisMsg = displayMessages
}
  console.log(4456354, thisMsg);

  if (!thisMsg.intent) {
    console.log('🤖  Try something else. I got no intent :)');
    msg = 'no results';
    // return msg;
  }
  switch (thisMsg.intent) {
    case 'greeting':
      // console.log(100);
      msg = {
        value:
          "Excellent! I'm going to need to ask you a few questions.\n\nFirst, please enter a few keywords describing what you want.",
        intent: 'search_term',
        user: 'bot',
        choose: false,
        date: buildDate()
      };
      return { message: msg, params: params };
    case 'search_term':
      // console.log(101, thisMsg);
      msg = {
        value: thisMsg.value,
        intent: 'confirm_keyword',
        user: 'notbot',
        choose: false,
        date: buildDate()
      };
      return { message: msg, params: params };
    case 'confirm_keyword':
      // console.log(102);
      msg = {
        message: {
          value: 'OK, try again.',
          intent: 'confirm_keyword',
          user: 'bot',
          choose: true,
          date: buildDate()
        }
      };
      return { message: msg, params: params };
    case 'search_term_confirmed':
      // console.log(103);
      params.search_term = params.search_term;
      // console.log(98, params, thisMsg)
      msg = {
        message: {
          value: 'Do you want a new or a used ' + params.search_term + '?',
          intent: 'condition',
          user: 'bot',
          choose: true,
          date: buildDate()
        }
      };
      return { message: msg, params: params };
    case 'condition':
      // console.log(104);
      params.condition = thisMsg.value;
      msg = {
        value:
          "Excellent! Let's find you a " +
          params.condition +
          ' ' +
          params.search_term +
          ' How much do you want to spend?',
        intent: 'budget',
        user: 'bot',
        choose: false,
        date: buildDate()
      };
      return { message: msg, params: params };
    case 'budget':
      // console.log(105);
      params.budget = thisMsg.value;
      msg = {
        value:
          'So you have a budget of ' +
          params.budget +
          '.  Do you want a ' +
          params.search_term +
          ' you can pick up locally or is it OK to have it shipped',
        intent: 'location_pref',
        user: 'bot',
        choose: true,
        date: buildDate()
      };
      return { message: msg, params: params };
    case 'location_pref':
      // console.log(106);
      params.location_pref = thisMsg.value;
      msg = {
        value:
          'So you want to find something ' +
          params.location_pref +
          '. Great. Whats your ZIP code?',
        intent: 'zip_code',
        user: 'bot',
        choose: false,
        date: buildDate()
      };
      return { message: msg, params: params };
    case 'zip_code':
      // console.log(107);
      params.zip_code = thisMsg.value;
      msg = {
        value:
          'Thanks for your ZIP code. Just give me a few moments to search.',
        user: 'bot',
        intent: 'display_results',
        choose: false,
        date: buildDate()
      };
      return { message: msg, params: params };
    case 'display_results':
      // console.log(108);
      // params.zip_code = thisMsg.value;
      msg = {
        value: 'Here are your items.',
        intent: 'end',
        user: 'bot',
        choose: false,
        date: buildDate()
      };
      return { message: msg, params: params };
    default:
      // console.log(109);
      msg = {
        value: "Sorry, I didn't catch that.",
        intent: 'clarity',
        user: 'bot',
        choose: true,
        date: buildDate()
      };
      return { message: msg, params: params };
  }
};
