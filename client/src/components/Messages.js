import React from 'react';
import PropTypes from 'prop-types';

Messages.PropTypes = {
  displayMessages: PropTypes.array
};


export default function Messages({ displayMessages }) {
  return (
   <div>

    <ul>
      {displayMessages.map((message, i) => (
        <li key={i}>{message.value}
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
      <span>{message}</span>
    </div>
  );
}
