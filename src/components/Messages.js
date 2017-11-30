import React from 'react';
// import PropTypes from 'prop-types';
import Choose from './Choose';

// Messages.PropTypes = {
//   displayMessages: PropTypes.array
// };

export default function Messages({ displayMessages, sendMessage}) {
  console.log(1, displayMessages)
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

  console.log(2, message);
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
