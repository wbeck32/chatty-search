import React, { Component } from 'react';
import './scss/App.css';
import _ from 'lodash';
import { submitMessage, handleMessage } from '../src/services/wit-api';
import { checkKeywords, callFindingAPI } from '../src/services/ebay-api';
import Messages from '../src/components/Messages';
import Send from '../src/components/Send';
import Results from '../src/components/Results';
import Portal from '../src/components/Portal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMessages: [
        {
          value: 'Hello! What would you like to search for today?',
          intent: 'search_term',
          user: 'bot',
          choose: false,
          date: this.buildDate()
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

  buildDate() {
    let date = new Date();
    date = date.toLocaleString();
    return date;
  }

  async sendMessage(q) {
    let { displayMessages, params } = this.state;

    if (q.message !== undefined) {
      q.choose !== undefined ? (q.message.choose = q.choose) : q.message.choose;
      q.intent !== undefined
        ? q.intent === 'keywords_confirmed'
          ? (q.message.intent = 'search_term_confirmed')
          : (q.message.intent = q.intent)
        : q.message.intent;
      q = q.message;
      console.log(9999999, q)
      params.search_term = q.value
      this.setState({ params: params });
      this.respondToMessage();
    } else {
      if (
        q.intent !== undefined &&
        (q.intent === 'search_term' ||
          Object.keys(q.intent).includes('search_term'))
      ) {
        displayMessages.push({
          value: q.value,
          intent: 'search_term',
          user: 'notbot',
          choose: false,
          date: this.buildDate()
        });
        this.setState({ displayMessages: displayMessages });
        this.refineKeywords();
      } else {
        // console.log(2299, q);
        displayMessages.push({
          value: q.value,
          intent: q.intent,
          user: 'notbot',
          choose: false,
          date: this.buildDate()
        });
        this.setState({ displayMessages: displayMessages });
        this.respondToMessage();
      }
    }
  }

  async refineKeywords() {
    const { displayMessages } = this.state;
    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    const refinedKeywords = await checkKeywords(lastMsg);
    if (refinedKeywords.body.ack === 'Success') {
      displayMessages.push({
        value: refinedKeywords.body.keywords,
        intent: 'confirm_keyword',
        user: 'bot',
        choose: true,
        date: this.buildDate()
      });
      this.setState({ displayMessages: displayMessages });
      this.respondToMessage();
      // return;
    } else {
      this.setState({ displayMessages: lastMsg });
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
      date: this.buildDate()
    };
    const { displayMessages } = this.state;
    displayMessages.push(pleaseHold);
    this.setState({ displayMessages: displayMessages });

    const searchResults = await callFindingAPI(q);
    console.log(1000, searchResults);
  }

  async respondToMessage() {
    const { displayMessages, params, response } = this.state;
    console.log(121212, displayMessages, params)
    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    console.log(202002, lastMsg);
    const msgResponse = await handleMessage(lastMsg, params);
    console.log(33, msgResponse);
    // if (resp.body.ack && resp.body.ack === 'Warning') {
    //no suggested keywords

    // }
    // displayMessages.push(resp);
    // this.setState({
    //   response: resp.value,
    //   displayMessages: displayMessages
    // });
  }

  async loadMoreHistory() {
    let more = await _.range(20).map(v => 'yo');
    this.setState({ messages: this.state.messages.concat(more) });
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
