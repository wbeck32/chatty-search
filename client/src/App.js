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
          intent: 'greetings',
          user: 'bot',
          choose: false,
          date: this.buildDate()
        }
      ],
      results: [],
      response: '',
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
    q.choose !== undefined ? q.message.choose = q.choose : q
    q.intent !== undefined ? q.message.intent = q.intent : q

    let { displayMessages } = this.state;
    const submittedMessage = await submitMessage(q);
    const { entities, _text } = submittedMessage.body;
    if (Object.keys(entities).includes('search_term')) {
      displayMessages.push({
        value: _text,
        intent: 'search_term',
        user: 'notbot',
        choose: false,
        date: this.buildDate()
      });
      this.setState({ displayMessages: displayMessages });
      this.refineKeywords();
    } else {
      console.log(2299, Object.keys(entities));
      displayMessages.push({
        value: _text,
        intent: entities,
        user: 'notbot',
        choose: false,
        date: this.buildDate()
      });
      this.setState({ displayMessages: displayMessages });
      this.respondToMessage();
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
      return
  }
}

  async respondToMessage() {
    const { displayMessages, response } = this.state;
    const tmp = Array.from(displayMessages);
    const lastMsg = tmp.pop();
    const resp = await handleMessage(lastMsg);
    console.log(33, resp);
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

    return (
      <div className="App">
        <div className="chat" id="chatty-search">
          <Portal
            displayMessages={displayMessages}
            sendMessage={message => this.sendMessage(message)}
          />
          <Send sendMessage={q => this.sendMessage(q)} />
        </div>

        <Results results={results} />
      </div>
    );
  }
}

export default App;
