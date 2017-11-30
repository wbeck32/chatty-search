import React, { Component } from 'react';
import './scss/App.css';
import {
  submitMessage,
  handleMessage,
  buildDate
} from '../src/services/wit-api';
import { checkKeywords, callFindingAPI } from '../src/services/ebay-api';
import Send from '../src/components/Send';
import Results from '../src/components/Results';
import Portal from '../src/components/Portal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMessages: [
        {
          value:
            "Hello! I'm here to help you find items to buy on eBay. What would you like to search for today?",
          intent: 'search_term',
          user: 'bot',
          choose: false,
          entities: 'entities',
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
      }
    };
  }

  async sendMessage(q) {
    console.log(100, q)
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
      // return;
    }
    if (q.intent === 'search_term') {
      displayMessages.push({
        value: q.value,
        intent: 'search_term',
        user: 'notbot',
        choose: false,
        date: buildDate()
      });
      this.setState({ displayMessages: displayMessages });
      this.refineKeywords();
      return;
    }
    // console.log(2299, q);
    displayMessages.push({
      value: q.value,
      intent: q.intent,
      user: 'notbot',
      choose: false,
      date: buildDate()
    });
    this.setState({ displayMessages: displayMessages });
    this.respondToMessage();
  }

  async refineKeywords() {
    const { displayMessages, params } = this.state;
    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    const refinedKeywords = await checkKeywords(lastMsg);
    console.log(333, refinedKeywords)
    if (refinedKeywords.ack === 'Success') {
      displayMessages.push({
        value: refinedKeywords.keywords,
        intent: 'confirm_keyword',
        user: 'bot',
        choose: true,
        date: buildDate()
      });
      this.setState({ displayMessages: displayMessages });
      this.respondToMessage();
      // return;
    } else {
      params.search_term = lastMsg.value;
      this.setState({ params: params });
      this.respondToMessage();
    }
  }

  async searchForItems(q) {
    // console.log(1000, q)
    const pleaseHold = {
      value: 'Please wait a few moments while I find some items for you.',
      intent: 'search_term',
      user: 'notbot',
      choose: false,
      date: buildDate()
    };
    const { displayMessages } = this.state;
    displayMessages.push(pleaseHold);
    this.setState({ displayMessages: displayMessages });
    const searchResults = await callFindingAPI(q);
    console.log(1000, searchResults);
  }

  async respondToMessage() {
    const { displayMessages, params } = this.state;
    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    const wittedMsg = await submitMessage(lastMsg);
    console.log(88, wittedMsg);
    const msgResponse = await handleMessage(wittedMsg, params);
    console.log(89, msgResponse);
    displayMessages.push(msgResponse);
    this.setState({ displayMessages: displayMessages });
    // console.log(33, msgResponse);
    // if (resp.body.ack && resp.body.ack === 'Warning') {
    //no suggested keywords

    // }
    // displayMessages.push(resp);
    // this.setState({
    //   response: resp.value,
    //   displayMessages: displayMessages
    // });
  }

  render() {
    const { displayMessages, results } = this.state;
    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    return (
      <div className="App">
        <div className="chat" id="chatty-search">
          <Portal
            displayMessages={displayMessages}
            sendMessage={message => this.sendMessage(message)}
          />
          <Send lastMsg={lastMsg} sendMessage={q => this.sendMessage(q)} />
        </div>
        <Results results={results} />
      </div>
    );
  }
}

export default App;
