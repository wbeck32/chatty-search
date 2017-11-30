export default function buttonCase(message) {
  let tText, fText, tChoose, fChoose, tIntent, fIntent, msg;

  switch (message.intent) {
    case 'welcome':
      msg = {
        tText: 'Yep! Let\s go!',
        fText: 'No, not right now.',
        tChoose: false,
        fChoose: false,
        tIntent: 'search_term',
        fIntent: 'goodbye'
      };
      return msg;
    case 'confirm_keyword':
      msg = {
        tText: 'That\s what I want!',
        fText: 'No, let me try again.',
        tChoose: 'false',
        fChoose: 'true',
        tIntent: 'condition',
        fIntent: 'confirm_keyword'
      };
      return msg;
    case 'condition':
      msg = {
        tText: 'Something shiny and new!',
        fText: 'Used is OK.',
        tChoose: 'false',
        fChoose: 'false',
        tIntent: 'budget',
        fIntent: 'budget'
      };
      return msg;
    case 'location_pref':
      let eText, eChoose, eIntent;
      msg = {
        tText: 'I want to go pick it up myself.',
        fText: 'I want it shipped to me.',
        eText: 'Either one is fine.',
        tChoose: 'false',
        fChoose: 'false',
        eChoose: 'false',
        tIntent: 'search',
        fIntent: 'search',
        eIntent: 'search'
      };
      return msg;
    default:
      console.log('nothing');
      break;
  }
}
