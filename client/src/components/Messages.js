import React from 'react';
import PropTypes from 'prop-types';

Messages.PropTypes = {
  messages: PropTypes.array
};

export default function Messages({ messages }) {
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>
          <Message message={message} />
        </li>
      ))}
    </ul>
  );
}

Message.PropTypes = {
  message: PropTypes.object
};

export function Message({ message }) {
  return (
    <div>
      <span>{message.value}</span>
    </div>
  );
}
