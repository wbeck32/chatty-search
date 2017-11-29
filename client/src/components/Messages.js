import React from 'react';
import PropTypes from 'prop-types';

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
        <li className="clearfix" key={i}>{message.value}
          <Message message={message.value} />
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
    <div className="message-data">
    <span className="message-data-time">10:10 AM, Today</span>&nbsp; &nbsp;
    <span className="message-data-name">{message.user}</span>
    <i className="fa fa-circle me"></i></div>
    <div className="message other-message float-right">{message}</div>
    </div>
  );
}
