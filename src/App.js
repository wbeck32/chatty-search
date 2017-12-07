import React, { Component } from 'react';
import './scss/App.css';
import { submitMessage, handleMessage } from './services/wit';
import { checkKeywords, callFindingAPI } from './services/ebay';
import {
  buildDate,
  switches,
  pushNoDupes,
  getIntent
} from './services/helpers';
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
          date: {
            string: buildDate().string,
            unixTime: buildDate().unixTime
          }
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
      switchData: switches
    };
  }

  async componentWillMount() {
    const switchData = switches;
    this.setState({ switchData: switches });
  }

  async witMessage(q) {
    // console.log(1, q);
    let { displayMessages, params } = this.state;
    // if (q.message !== undefined) {
    //   q.choose !== undefined ? (q.message.choose = q.choose) : q.message.choose;
    //   q.intent !== undefined
    //     ? q.intent === 'keywords_confirmed'
    //       ? (q.message.intent = 'search_term_confirmed')
    //       : (q.message.intent = q.intent)
    //     : q.message.intent;
    //   q = q.message;
    //   params.search_term = q.value;
    //   this.setState({ params: params });
    //   this.respondToMessage();
    //   return;
    // }

    if (q.intent === 'search_term' || q.intent === 'confirm_keyword') {
      const newKeys = await this.refineKeywords(q.value);
      q.value = newKeys
      return;
    } else {
      let currMsg = {
        value: q.value,
        intent: q.intent,
        user: 'notbot',
        choose: q.choose,
        date: buildDate()
      };
      // displayMessages.push(q);
      const currentWitMsg = await submitMessage(currMsg, params);
      // console.log(8888, currentWitMsg);
      currMsg.msg_id = currentWitMsg.msg_id;

      console.log(2, displayMessages, currMsg);

      // console.log(6, displayMessages, currentWitMsg);
      const cleanDispMsgs = pushNoDupes(displayMessages, currMsg);
      // console.log(8, cleanDispMsgs);
      console.log(5, cleanDispMsgs);
      this.setState({ displayMessages: cleanDispMsgs });
      this.respondToMessage();
    }
  }

  async respondToMessage() {
    const { displayMessages, params } = this.state;

    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    console.log(838384857547, lastMsg);

    let wittedMsg = lastMsg;
    let handledMessage = await handleMessage(wittedMsg, params);
    console.log(8888, handledMessage)
    const cleanDispMsgs = pushNoDupes(displayMessages, handledMessage);
    this.setState({
      displayMessages: cleanDispMsgs,
      params: handledMessage.params
    });
    console.log(99, cleanDispMsgs)
    this.refineKeywords()
    // handledMessage.message.intent === 'search_term' ? this.refineKeywords() : this.handle
    // let handled = await handleMessage(latestMsg, params);
  }

  async refineKeywords() {
    const { displayMessages, params } = this.state;
    console.log(323564, displayMessages, params);

    // const refinedKeywords = await checkKeywords(keywords);
    // // console.log(333, refinedKeywords)
    // if (refinedKeywords.ack === 'Success') {
    //   const didYouMean = {
    //     value: 'Did you mean ' + refinedKeywords.keywords + '?',
    //     intent: 'confirm_keyword',
    //     user: 'bot',
    //     choose: true,
    //     date: {
    //       string: buildDate().string,
    //       unixTime: buildDate().unixTime
    //     }
    //   };
    //   const cleanDispMsgs = pushNoDupes(displayMessages, didYouMean, params);
    //   // console.log(77777777, cleanDispMsgs);
    //   this.setState({ displayMessages: cleanDispMsgs });
    //   this.respondToMessage();
    // } else {
      // params.search_term = keywords.value;
      const confirmedSearch = {
        value: "Let's find you a " + params.search_term + '!',
        intent: 'search_term_confirmed',
        user: 'bot',
        choose: false,
        date: {
          string: buildDate().string,
          unixTime: buildDate().unixTime
        }
      };
      const cleanDispMsgs = pushNoDupes(
        displayMessages,
        confirmedSearch,
        params
      );
      // console.log(77777777, cleanDispMsgs);
      this.setState({ displayMessages: cleanDispMsgs, params: params });
      this.respondToMessage();
    }
  // }

  async searchForItems(q) {
    // console.log(1000, q)
    const pleaseHold = {
      value: 'Please wait a few moments while I find some items for you.',
      intent: 'search',
      user: 'notbot',
      choose: false,
      date: {
        string: buildDate().string,
        unixTime: buildDate().unixTime
      }
    };
    const { displayMessages, params } = this.state;
    // console.log(9)
    const cleanDispMsgs = pushNoDupes(displayMessages, pleaseHold, params);
    // console.log(77777777, cleanDispMsgs);
    this.setState({ displayMessages: cleanDispMsgs });
    const searchResults = await callFindingAPI(q);
    // console.log(1000, searchResults);
  }



  render() {
    const { displayMessages, results, switchData } = this.state;
    // console.log(26, displayMessages);

    const tmp = Array.from(displayMessages);
    // console.log(26, tmp);
    const lastMsg = tmp.pop();
    return (
      <div className="App">
        <div className="chat" id="chatty-search">
          <Portal
            displayMessages={displayMessages}
            witMessage={message => this.witMessage(message)}
            switchData={switchData}
          />
          <Send lastMsg={lastMsg} witMessage={q => this.witMessage(q)} />
        </div>
        <Results results={results} />
      </div>
    );
  }
}

export default App;
