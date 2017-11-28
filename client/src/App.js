import React, { Component } from 'react';
import './scss/App.css';
import _ from 'lodash';
import { submitMessage, handleMessage } from '../src/services/wit-api';
import { checkKeywords, callFindingAPI } from '../src/services/ebay-api';
import Messages from '../src/components/Messages';
import ChatbotSend from '../src/components/ChatbotSend';
import Results from '../src/components/Results';
import Response from '../src/components/Response';
import ReactChatView from 'react-chatview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessages: [
        {
          value:'Hello! What would you like to search for today?',
          intent:'greetings'
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

  async sendMessage(q){
    let { displayMessages, messageData } = this.state;
    const entity = await submitMessage(q);
    displayMessages.push({value:q.q, intent:entity.entity});
    this.setState({
      displayMessages: displayMessages
    });
    this.respondToMessage();
    // if (addMessage.entity === 'search_term') {
    // make sure all search params are populated
    // this.searchEbay(addMessage.value);
    // }
  }

  async respondToMessage() {
    const { displayMessages, response } = this.state;
    const resp = await handleMessage(displayMessages);
    displayMessages.push(resp);
    this.setState({
      response: resp.value,
      displayMessages: displayMessages
    });
  }

  async searchEbay(keywords) {
    const refinedKeywords = await checkKeywords(keywords);
    const searchKeys =
      refinedKeywords.body[0] !== '' ? refinedKeywords.body : keywords;
    const results = await callFindingAPI(encodeURI(searchKeys));
    this.setState({ results: results });
  }

  async loadMoreHistory() {
    let more = await _.range(20).map(v => 'yo');
    this.setState({ messages: this.state.messages.concat(more) });
  }

  render() {
    const { displayMessages, results, response } = this.state;
    return (
      <div className="App">
        <ReactChatView
          className="content"
          scrollLoadThreshold={50}
          onInfiniteLoad={this.loadMoreHistory}>
          <Messages displayMessages={displayMessages} />
        </ReactChatView>
        <ChatbotSend sendMessage={q => this.sendMessage(q)} />
        <Results results={results} />
      </div>
    );
  }
}

export default App;
