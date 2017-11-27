import React, { Component } from 'react';
import './scss/App.css';
import _ from 'lodash';
import { submitMessage } from '../src/services/wit-api';
import { checkKeywords, callFindingAPI } from '../src/services/ebay-api';
import Messages from '../src/components/Messages';
import ChatbotSend from '../src/components/ChatbotSend';
import Results from '../src/components/Results';
import ChatView from 'react-chatview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      results: []
    };
  }

  async sendMessage(q) {
    const { messages } = this.state;
    const addMessage = await submitMessage(q);
    messages.push(addMessage);
    this.setState({ messages: messages });
    if (addMessage.entity === 'search_term') {
      const refinedKeywords = await checkKeywords(addMessage.value);
      const searchKeys =
        refinedKeywords.body[0] !== ''
          ? refinedKeywords.body
          : addMessage.value;
      const results = await callFindingAPI(encodeURI(searchKeys));
      this.setState({ results: results });
    }
  }

  async loadMoreHistory() {
    let more = await _.range(20).map(v => 'yo');
    this.setState({ messages: this.state.messages.concat(more) });
  }

  render() {
    const { messages, results } = this.state;
    console.log(90909, messages, results)
    return (
      <div className="App">
        <ChatView
          className="content"
          scrollLoadThreshold={50}
          onInfiniteLoad={this.loadMoreHistory}>
          <Messages messages={messages} />
        </ChatView>
        <ChatbotSend sendMessage={q => this.sendMessage(q)} />
        <Results results={results} />
      </div>
    );
  }
}

export default App;
