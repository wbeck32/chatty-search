import React from 'react';
import Messages from './Messages'

export default function Portal({displayMessages}) {
  return (
    <div className="chat-history">

  <Messages displayMessages={displayMessages} />
  </div>
);
}
