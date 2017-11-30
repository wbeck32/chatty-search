import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
  margin-right: 10px;
`;

// Choose.PropTypes = {
  // sendMessage: PropTypes.func
// };

export default function Choose({ message, sendMessage }) {
  return (
    <div className="message-data">
      <span className="message-data-time">{message.date}</span>&nbsp; &nbsp;
      <span className="message-data-name">{message.user}</span>
      <i className="fa fa-circle me" />
      <div className="message my-message">{'Did you mean '+message.value+'?'}
      <div><Button onClick={target => sendMessage({message:message,choose:false, intent:'keywords_confirmed'})}>Yes</Button>
      <Button onClick={target => sendMessage({message:message,choose:true, intent:'keywords_not_confirmed'})}>No</Button></div>
      </div>

    </div>
  );
}
