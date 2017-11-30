import React from 'react';
import PropTypes from 'prop-types';
import Choose from './Choose';

Messages.PropTypes = {
  displayMessages: PropTypes.array
};

export default function Messages({ displayMessages }) {
  //if {message.user} is not bot, add align-right
  // <div className="message-data align-right">

  return (
    <div className="chat-history">
      <ul>
        {displayMessages.map((message, i) => (
          <li className="clearfix" key={i}>
            {message.value}
            <Message message={message} />
          </li>
        ))}
      </ul>
    </div>
  );
}

Message.PropTypes = {
  message: PropTypes.object
};

export function Message({ message }) {
  return (
    <div>
      {message.choose && <Choose />}
      {message.user === 'bot' && (
        <div className="message-data">
          <span className="message-data-time"> AM, Today</span>&nbsp;
          &nbsp;
          <span className="message-data-name">bot {message.user}</span>
          <i className="fa fa-circle me" />
        </div>
      )}
      {message.user !== 'bot' && (
        <div className="message-data align-right">
          <span className="message-data-time">10:10 AM, Today</span>&nbsp;
          &nbsp;
          <span className="message-data-name">notbot {message.user}</span>
          <i className="fa fa-circle me" />
        </div>
      )}
      <div className="message other-message float-right">{message.value}</div>
    </div>
  );
}
