import React, { Component } from 'react';
import './scss/App.css';
import _ from 'lodash';
import { sendMessage } from '../src/services/wit-api';
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

  loadMoreHistory() {
    return new Promise((resolve, reject) => {
      let more = _.range(20).map(v => 'yo');
      this.setState({ messages: this.state.messages.concat(more) });
      resolve();
    });
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="App">
        <ChatbotMessages messages={messages} />
        <ChatbotSend sendMessage={q => sendMessage(q)} />
        <DisplayResults />
      </div>
    );
  }
}

export default App;

// <ChatView
// className="content"
// flipped={true}
// scrollLoadThreshold={50}
// onInfiniteLoad={this.loadMoreHistory.bind(this)}>
// {this.state.messages.map((v, ix) => <div key={ix}>{`${ix}: ${v}`}</div>)}
// </ChatView>
