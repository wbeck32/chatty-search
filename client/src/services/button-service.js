export default function buttonCase(intent) {
  let tText, fText, tChoose, fChoose, tIntent, fIntent

  switch (intent) {
    case 'welcome':
    msg = {
      tText: '',
      fText: '',
      tChoose: '',
      fChoose: '',
      tIntent: '',
      fIntent: ''
    };
    return msg;
    case 'confirm_keyword':
      msg = {
        tText: '',
        fText: '',
        tChoose: '',
        fChoose: '',
        tIntent: '',
        fIntent: ''
      };
      return msg;
      case 'condition':
      msg = {
        tText: '',
        fText: '',
        tChoose: '',
        fChoose: '',
        tIntent: '',
        fIntent: ''
      };
      case 'location_pref':
      let eText, eChoose, eIntent
      msg = {
        tText: '',
        fText: '',
        tChoose: '',
        fChoose: '',
        tIntent: '',
        fIntent: '',
        eText: '',
        eChoose: '',
        eIntent: ''
      };
      return msg;
      default:
      console.log('nothing');
      break;
}