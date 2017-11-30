import React from 'react';
import Messages from './Messages'

export default function Portal({displayMessages, sendMessage}) {
  return (
    <div className="chat-history">

  <Messages displayMessages={displayMessages} sendMessage={message => sendMessage(message)}/>
  </div>
);
}
