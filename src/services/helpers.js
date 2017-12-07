import { handleMessage } from '../services/wit';
export const buildDate = () => {
  let date = new Date();
  date.unixTime = date.valueOf();
  date.string = date.toLocaleString();
  return date;
};

export const getIntent = message => {
  console.log(78787, message)
  const intent = Object.keys(message.entities);
  console.log(8989, intent)
  return intent;
};

export const pushNoDupes = (displayMessages, currentMessage) => {
  console.log(3, displayMessages, currentMessage);
  // const storedMsgs = Object.values(displayMessages);
  const tmp = Array.from(displayMessages);
  const lastMsg = tmp.pop();
  currentMessage.message
    ? (currentMessage = currentMessage.message)
    : currentMessage;
  // console.log(13, lastMsg.date.unixTime);
  // console.log(14, currentMessage.date.unixTime);

  if (lastMsg.date.unixTime && currentMessage.date.unixTime) {
    if (
      currentMessage.date.unixTime - lastMsg.date.unixTime <= 10000 &&
      currentMessage.value !== lastMsg.value
    ) {
      displayMessages.push(currentMessage);
      // console.log(13, displayMessages);
    }
  }
  console.log(4, displayMessages);
  return displayMessages;
};

export const switches = {
  welcome: {
    tText: 'Yep! Lets go!',
    fText: 'No, not right now.',
    tChoose: false,
    fChoose: false,
    tIntent: 'greeting',
    fIntent: 'goodbye'
  },
  confirm_keyword: {
    prevIntent: 'confirm_keyword',
    tText: 'Thats what I want!',
    fText: 'No, let me try again.',
    tChoose: false,
    fChoose: true,
    tIntent: 'condition',
    fIntent: 'confirm_keyword'
  },
  condition: {
    prevIntent: 'condition',
    tText: 'Something shiny and new!',
    fText: 'Used is OK.',
    tChoose: false,
    fChoose: false,
    tIntent: 'budget',
    fIntent: 'budget'
  },
  location_pref: {
    prevIntent: 'location_pref',
    tText: 'I want to go pick it up myself.',
    fText: 'I want it shipped to me.',
    eText: 'Either one is fine.',
    tChoose: false,
    fChoose: false,
    eChoose: false,
    tIntent: 'search',
    fIntent: 'search',
    eIntent: 'search'
  }
};
