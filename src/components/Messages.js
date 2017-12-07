import React from 'react';
import Choose from './Choose';

export default function Messages({ displayMessages, sendMessage, switchData}) {
  // console.log(1, displayMessages)
  return (
    <div className="chat-history">
      <ul>
        {displayMessages.map((message, i) => (
          <li className="clearfix" key={i}>
            <Message sendMessage={message => sendMessage(message)} message={message} switchData={switchData} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Message({ message, sendMessage, switchData }) {
  // console.log(2, message);
  let switches
  message.intent === 'welcome' ? switches = switchData.welcome : message.intent
  message.intent === 'confirm_keyword' ? switches = switchData.confirm_keyword : message.intent
  message.intent === 'condition' ? switches = switchData.condition : message.intent
  message.intent === 'location_pref' ? switches = switchData.location_pref : message.intent

  return (
    <div>
      {message.choose && <Choose switchData={switches} message={message} sendMessage={message => sendMessage(message)}/>}
      {message.user === 'bot' && !message.choose && (
        <div className="message-data">
          <span className="message-data-time">{message.date.string}</span>&nbsp; &nbsp;
          <span className="message-data-name">{message.user}</span>
          <i className="fa fa-circle me" />
          <div className="message my-message">{message.value}</div>
        </div>
      )}
      {message.user !== 'bot' && (
        <div className="message-data align-right">
          <span className="message-data-time">{message.date.string}</span>&nbsp;
          &nbsp;
          <span className="message-data-name">{message.user}</span>
          <i className="fa fa-circle me" />
          <div className="message other-message float-right">
            {message.value}
          </div>
        </div>
      )}
    </div>
  );
}
