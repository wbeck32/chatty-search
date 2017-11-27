import React, { Component } from 'react';
import './scss/App.css';
import { sendMessage } from '../src/services/wit-api';
import ChatbotMessages from '../src/components/ChatbotMessages';
import ChatbotSend from '../src/components/ChatbotSend';
import DisplayResults from '../src/components/DisplayResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  render() {
    return (
      <div className="App">
        <ChatbotMessages props={this.props}/>
        <ChatbotSend sendMessage={q => sendMessage(q)} />
        <DisplayResults />
      </div>
    );
  }
}

export default App;
