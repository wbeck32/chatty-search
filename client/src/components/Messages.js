import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
import getMuiTheme from '../../node_modules/material-ui/styles/getMuiTheme';
import FlatButton from '../../node_modules/material-ui/FlatButton';

Messages.PropTypes = {
  displayMessages: PropTypes.array
};
Messages.contextTypes = {
  muiTheme: PropTypes.object
};

export default function Messages({ displayMessages }) {
  return (
   <div> <FlatButton>button</FlatButton>

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
