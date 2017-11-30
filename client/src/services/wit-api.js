require('dotenv');
const fetch = require('fetch-jsonp');
const querystring = require('querystring');

export const buildDate = () => {
  let date = new Date();
  date = date.toLocaleString();
  return date;
};

export const submitMessage = async message => {
  const context = JSON.stringify({ id: message.intent, doc: message.intent });
  const v = '20170307';
  const verbose = true;
  const token = process.env.REACT_APP_WIT_CLIENT_TOKEN;
  const query = querystring.stringify({
    q: message.value,
    verbose: verbose,
    v: v,
    context: context,
    access_token: token
  });

  let messageResults = await fetch(`https://api.wit.ai/message?${query}`);
  messageResults = Promise.resolve(messageResults.json()).then(res => {
    const intent = Object.keys(res.entities)[0];
    const results = {
      value: res._text,
      intent: intent === 'search_term' ? 'search_term_confirmed' : intent,
      user: 'bot',
      choose: false,
      date: buildDate()
    };
    return results;
  });
  return messageResults;
};

export const handleMessage = async (lastMsg, params) => {
  let msg = '';
  console.log(223, lastMsg, params);

  if (!lastMsg.intent) {
    console.log('🤖  Try something else. I got no intent :)');
    msg = 'no results';
    return msg;
  }
  switch (lastMsg.intent) {
    case 'confirm_keyword':
      msg = { message: lastMsg, params: params };
      return msg;
    case 'search_term_confirmed':
      msg = lastMsg;
      lastMsg.intent = 'condition';
      lastMsg.value =
        'Great! Do you want a new or used ' + params.search_term + '?';
      lastMsg.choose = true;
      return { message: lastMsg, params: params };
    case 'condition':
      params.condition = lastMsg.value;
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
        date: buildDate(),
        params: params
      };
      return msg;
    case 'budget':
      params.budget = lastMsg.value;
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
        date: buildDate(),
        params: params
      };
      return msg;
    case 'location_pref':
      params.location_pref = lastMsg.value;
      msg = {
        value:
          'So you want to find something ' +
          params.location_pref +
          '. Great. Whats your ZIP code?',
        intent: 'zip_code',
        user: 'bot',
        choose: true,
        date: buildDate(),
        params: params
      };
      return msg;
    case 'zip_code':
      params.zip_code = lastMsg.value;
      msg = {
        value:
          'Thanks for your ZIP code. Just give me a few moments to search.',
        user: 'bot',
        intent: 'display_results',
        choose: true,
        date: buildDate(),
        params: params
      };
      return msg;
    case 'display_results':
      // params.zip_code = lastMsg.value;
      msg = {
        value: 'Here are your items.',
        intent: '',
        user: 'bot',
        choose: true,
        date: buildDate(),
        params: params
      };
      return msg;
    default:
      console.log(`🤖  ${lastMsg.intent}`);
      break;
  }
};
