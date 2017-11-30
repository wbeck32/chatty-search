import React from 'react';
import styled from 'styled-components';
import buttonCase from '../services/button-service'

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
  margin-right: 10px;
`;

export default function Choose({ message, sendText }) {
  const choice = buttonCase(message)
  return (
    <div className="message-data">
      <span className="message-data-time">{message.date}</span>&nbsp; &nbsp;
      <span className="message-data-name">{message.user}</span>
      <i className="fa fa-circle me" />
        <div className="message my-message">{message.value}
        <div><Button onClick={target => sendText({message:choice.tMessage,choose:choice.tChoice, intent:choice.tIntent})}>{choice.tText}</Button>
        <Button onClick={target => sendText({message:choice.fMessage,choose:choice.fChoice, intent:choice.fIntent})}>{choice.fText}</Button>
        {message.intent === 'location_pref'&&<Button onClick={target => sendText({message:choice.eMessage,choose:choice.eChoice, intent:choice.eIntent})}>{choice.eText}</Button>}
        </div>
      </div>
    </div>
  )
}
