import React from 'react';
import PropTypes from 'prop-types';

Chatbot.PropTypes = {
  sendMessage: PropTypes.func
};

export default function Chatbot({sendMessage}) {
  return (
    <div className="botui-app-container" id="chatty-search">
      <bot-ui>
        <form
          onSubmit={event => {
            event.preventDefault();
            const form = event.target;
            const { query } = form.elements;
            sendMessage({ q: query.value });
            form.reset();
          }}>
          <button type="submit" name="add image">
            speak
          </button>
          <input
            type="text"
            className="message"
            name="query"
            placeholder="enter a title for your image"
          />
        </form>
      </bot-ui>
    </div>
  );
}
