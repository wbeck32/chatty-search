import React, { Component } from 'react';
import './App.css';
import {sendMessage } from '../src/services/wit-api'
import Chatbot from '../src/components/Chatbot'

class App extends Component {
  render() {
    return (
      <div className="App">
       <Chatbot sendMessage={q => sendMessage(q)}/>

      </div>
    );
  }
}

export default App;
