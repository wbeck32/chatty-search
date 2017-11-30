import React from 'react';
// import PropTypes from 'prop-types';
import Choose from './Choose';

// Messages.PropTypes = {
//   displayMessages: PropTypes.array
// };

export default function Messages({ displayMessages, sendMessage}) {
  //if {message.user} is not bot, add align-right
  // <div className="message-data align-right">
  return (
    <div className="chat-history">
      <ul>
        {displayMessages.map((message, i) => (
          <li className="clearfix" key={i}>
            <Message sendMessage={message => sendMessage(message)} message={message} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Message.PropTypes = {
//   message: PropTypes.object
// };

export function Message({ message, sendMessage }) {

  console.log(1, message.value, 2, message.user, 3, message.date, 4, message.intent);
  return (
    <div>
      {message.choose && <Choose message={message} sendMessage={message => sendMessage(message)}/>}
      {message.user === 'bot' && !message.choose && (
        <div className="message-data">
          <span className="message-data-time">{message.date}</span>&nbsp; &nbsp;
          <span className="message-data-name">{message.user}</span>
          <i className="fa fa-circle me" />
          <div className="message my-message">{message.value}</div>
        </div>
      )}
      {message.user !== 'bot' && (
        <div className="message-data align-right">
          <span className="message-data-time">{message.date}</span>&nbsp;
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
