import React from 'react';
import PropTypes from 'prop-types';

Chatbot.PropTypes = {

}

export default function Chatbot({ match, location, history }) {
  return (
    <div className="botui-app-container" id="chatty-search">
    <bot-ui></bot-ui>
    </div>

  )
}
