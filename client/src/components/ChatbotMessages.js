import React from 'react';
import PropTypes from 'prop-types';
const { render, Text } = require('@mainframe/bot-ui');

ChatbotMessages.PropTypes = {
  // sendMessage: PropTypes.func
};

export default function ChatbotMessages() {
  const ui = render(<Text>Hello!</Text>);

  console.log(22, ui.props.children);

  return <div>{ui.props.children}</div>;
}
