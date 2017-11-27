import React from 'react';
import PropTypes from 'prop-types';

Messages.PropTypes = {
  messages: PropTypes.array
};

export default function Messages({ messages }) {
  console.log(66, messages, typeof messages);

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
  console.log(90, message)
  return (
    <div>
      <span>{message.value}</span>
    </div>
  );
}
