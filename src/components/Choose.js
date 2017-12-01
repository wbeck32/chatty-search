import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
  margin-right: 10px;
`;


export default function Choose({ message, sendMessage, switchData }) {
  // console.log(1212, switchData)
  return (
    <div className="message-data">
      <span className="message-data-time">{message.date}</span>&nbsp; &nbsp;
      <span className="message-data-name">{message.user}</span>
      <i className="fa fa-circle me" />
        <div className="message my-message">{message.value}
        <div><Button onClick={target => sendMessage({value:switchData.tText,
        choose:switchData.tChoose, intent:switchData.tIntent, user: undefined})}>{switchData.tText}</Button>
        <Button onClick={target => sendMessage({value:switchData.fText,choose:switchData.fChoose, intent:switchData.fIntent, user: undefined})}>{switchData.fText}</Button>
        {message.intent === 'location_pref'&&<Button onClick={target => sendMessage({value:'switchData.eText',choose:switchData.eChoose, intent:switchData.eIntent, user: undefined})}>{switchData.eText}</Button>}
        </div>
      </div>
    </div>
  )
}

