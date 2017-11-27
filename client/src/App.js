import React, { Component } from 'react';
import './scss/App.css';
import _ from 'lodash';
import { submitMessage } from '../src/services/wit-api';
import ChatbotMessages from '../src/components/ChatbotMessages';
import ChatbotSend from '../src/components/ChatbotSend';
import DisplayResults from '../src/components/DisplayResults';
import ChatView from 'react-chatview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  async sendMessage( q ) {
    const { messages } = this.state;
    const addMessage = await submitMessage(q);
    messages.push(addMessage)
    console.log(33, addMessage)
    this.setState({ messages: messages });
  }

  async loadMoreHistory() {
      let more = await _.range(20).map(v => 'yo');
      this.setState({ messages: this.state.messages.concat(more) });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="App">
      <ChatView
      className="content"
      scrollLoadThreshold={50}
      onInfiniteLoad={this.loadMoreHistory}>
      <ChatbotMessages messages={messages} />

      </ChatView>


        <ChatbotSend sendMessage={q => this.sendMessage(q)} />
        <DisplayResults />
      </div>
    );
  }
}

export default App;
