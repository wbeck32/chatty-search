import React from 'react';
import PropTypes from 'prop-types';

Messages.PropTypes = {
  displayMessages: PropTypes.array
};

export default function Messages({ displayMessages }) {
  console.log(90,displayMessages)
  return (
    <ul>
      {displayMessages.map((message, i) => (
        <li key={i}>{message.value}
          <Message message={message.value} />
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
      <span>{message}</span>
    </div>
  );
}
