import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

ChatbotMessages.PropTypes = {
  messages: PropTypes.array
};
const messages = ['1', '2']
export default function ChatbotMessages( {messages} ) {
  console.log(20, messages, typeof messages)
  return (
    <div></div>
    // <ul>
    //   {messages.map((message, i) => (
    //     <li key={i}>
    //       <Message message={message} />
    //     </li>
    //   ))}
    // </ul>
  );
}
