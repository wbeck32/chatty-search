import React, { Component } from 'react';
import './scss/App.css';
import { sendMessage } from '../src/services/wit-api';
import ChatbotMessages from '../src/components/ChatbotMessages';
import ChatbotSend from '../src/components/ChatbotSend';
import DisplayResults from '../src/components/DisplayResults';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ChatbotMessages />
        <ChatbotSend sendMessage={q => sendMessage(q)} />
        <DisplayResults />
      </div>
    );
  }
}

export default App;
