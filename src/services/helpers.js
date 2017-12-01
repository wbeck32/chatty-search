export const buildDate = () => {
  let date = new Date();
  date = date.toLocaleString();
  return date;
};

export const pushNoDupes = (displayMessages, currentMessage) => {
  const storedMsgs = Object.values(displayMessages);
  storedMsgs.forEach(msg => {
    if (msg.date !== currentMessage.date) {
      storedMsgs.push(currentMessage);
    }
    return storedMsgs;
  });
  return storedMsgs;
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
