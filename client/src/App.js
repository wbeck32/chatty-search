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
          choose: false
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

  async sendMessage(q) {
    let { displayMessages } = this.state;
    const submittedMessage = await submitMessage(q);
    const { entities, _text } = submittedMessage.body;
    displayMessages.push({
      value: _text,
      intent: '',
      user: '',
      choose: false
    });
    if (Object.keys(entities).includes('search_term')) {
      this.refineKeywords(entities, _text);
    } else {
      this.respondToMessage(entities, _text);
    }
  }

  async refineKeywords(entities, _text) {
    const { displayMessages } = this.state;
    const refinedKeywords = await checkKeywords(_text);
    if (refinedKeywords.body.ack === 'Success') {
      displayMessages.push({
        value: 'Did you mean ' + refinedKeywords.body.keywords + '?',
        intent: '',
        user: 'bot',
        choose: true
      });
      this.setState({ displayMessages: displayMessages });
      //display yes/no buttons
      return;
    } else {
      this.respondToMessage(entities, _text);
      return;
    }
  }

  async respondToMessage(entities, _text) {
    console.log(100, entities);
    const { displayMessages, response } = this.state;
    const resp = await handleMessage(displayMessages);
    console.log(99, resp);
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
    const { displayMessages, results, response, choose } = this.state;

    return (
      <div className="App">
        <div className="chat" id="chatty-search">
          <Portal displayMessages={displayMessages} />
          <Send sendMessage={q => this.sendMessage(q)} />
        </div>

        <Results results={results} />
      </div>
    );
  }
}

export default App;
