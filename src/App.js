import React, { Component } from 'react';
import './scss/App.css';
import { submitMessage, handleMessage } from './services/wit';
import { checkKeywords, callFindingAPI } from './services/ebay';
import { buildDate, switches, pushNoDupes } from './services/helpers';
import Send from './components/Send';
import Results from './components/Results';
import Portal from './components/Portal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMessages: [
        {
          value:
            "Hello! I'm here to help you find items to buy on eBay. Are you ready to get started?",
          intent: 'welcome',
          user: 'bot',
          choose: true,
          date: buildDate()
        }
      ],
      results: [],
      params: {
        search_term: '',
        location_pref: '',
        condition: '',
        zip_code: '',
        budget: ''
      },
      switchData: {}
    };
  }

  async componentWillMount() {
    const switchData = switches;
    this.setState({ switchData: switches });
  }

  async sendMessage(q) {
    // console.log(100, q);
    let { displayMessages, params } = this.state;
    if (q.message !== undefined) {
      q.choose !== undefined ? (q.message.choose = q.choose) : q.message.choose;
      q.intent !== undefined
        ? q.intent === 'keywords_confirmed'
          ? (q.message.intent = 'search_term_confirmed')
          : (q.message.intent = q.intent)
        : q.message.intent;
      q = q.message;
      params.search_term = q.value;
      this.setState({ params: params });
      this.respondToMessage();
      return;
    }
    if (q.intent === 'search_term' || q.intent === 'confirm_keyword') {
      const roughKeys = {
        value: q.value,
        intent: 'search_term',
        user: 'notbot',
        choose: false,
        date: buildDate()
      };
      console.log(1214, roughKeys)
      const newKeys = await this.refineKeywords(roughKeys);
      console.log(1215, newKeys)
      // return;
    }
    const currMsg = {
      value: q.value,
      intent: q.intent,
      user: 'notbot',
      choose: q.choose,
      date: buildDate()
    };
    console.log(2288, displayMessages, currMsg)
    const cleanDispMsgs = pushNoDupes(displayMessages, currMsg);
    // console.log(2299, cleanDispMsgs);
    this.setState({ displayMessages: cleanDispMsgs });
    this.respondToMessage();
  }

  async refineKeywords(keywords) {
    const { displayMessages, params } = this.state;
    const refinedKeywords = await checkKeywords(keywords);
    // console.log(333, refinedKeywords)
    if (refinedKeywords.ack === 'Success') {
      const didYouMean = {
        value: 'Did you mean ' + refinedKeywords.keywords + '?',
        intent: 'confirm_keyword',
        user: 'bot',
        choose: true,
        date: buildDate()
      };
      const cleanDispMsgs = pushNoDupes(displayMessages, didYouMean);
      this.setState({ displayMessages: cleanDispMsgs });
      this.respondToMessage();
    } else {
      params.search_term = keywords.value;
      const confirmedSearch = {
        value: "Let's find you a " + params.search_term + '!',
        intent: 'search_term_confirmed',
        user: 'bot',
        choose: false,
        date: buildDate()
      };
      const cleanDispMsgs = pushNoDupes(displayMessages, confirmedSearch);
      this.setState({ displayMessages: cleanDispMsgs, params: params });
      this.setState({ params: params });
      this.respondToMessage();
    }
  }

  async searchForItems(q) {
    // console.log(1000, q)
    const pleaseHold = {
      value: 'Please wait a few moments while I find some items for you.',
      intent: 'search',
      user: 'notbot',
      choose: false,
      date: buildDate()
    };
    const { displayMessages } = this.state;
    // console.log(9)
    const cleanDispMsgs = pushNoDupes(displayMessages, pleaseHold);
    this.setState({ displayMessages: cleanDispMsgs });
    const searchResults = await callFindingAPI(q);
    // console.log(1000, searchResults);
  }

  async respondToMessage() {
    const { displayMessages, params } = this.state;
    const intentsNotToWit = [
      'welcome',
      'greeting',
      'goodbye',
      'confirm_keyword',
      'condition',
      'location_pref'
    ];
    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    let wittedMsg = lastMsg;
    // if (!intentsNotToWit.includes(lastMsg.intent)) {
    //   wittedMsg = await submitMessage(lastMsg);
    // }
    let msgResponse = await handleMessage(wittedMsg, params);
    console.log(99, msgResponse)
    const cleanDispMsgs = pushNoDupes(displayMessages, msgResponse.message);
    this.setState({ displayMessages: cleanDispMsgs, params: msgResponse.params });
    // const test = await this.respondToMessage()
  }

  render() {
    const { displayMessages, results, switchData } = this.state;
    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    return (
      <div className="App">
        <div className="chat" id="chatty-search">
          <Portal
            displayMessages={displayMessages}
            sendMessage={message => this.sendMessage(message)}
            switchData={switchData}
          />
          <Send lastMsg={lastMsg} sendMessage={q => this.sendMessage(q)} />
        </div>
        <Results results={results} />
      </div>
    );
  }
}

export default App;
