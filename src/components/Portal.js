import React from 'react';
import Messages from './Messages'

export default function Portal({displayMessages, witMessage, switchData}) {
  return (
    <div className="chat-history">

  <Messages displayMessages={displayMessages} sendMessage={message => witMessage(message)} switchData={switchData} />
  </div>
);
}
