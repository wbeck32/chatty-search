import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

ChatbotMessages.PropTypes = {
  messages: PropTypes.array
};

export default function ChatbotMessages( {messages} ) {
  console.log(20, messages, typeof messages);
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
