import React from 'react';
import Messages from './Messages'

export default function Portal({displayMessages, sendMessage, switchData}) {
  return (
    <div className="chat-history">

  <Messages displayMessages={displayMessages} sendMessage={message => sendMessage(message)} switchData={switchData} />
  </div>
);
}
