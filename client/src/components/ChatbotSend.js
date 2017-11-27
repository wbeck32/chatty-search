import React from 'react';
import PropTypes from 'prop-types';

ChatbotSend.PropTypes = {
  sendMessage: PropTypes.func,
  messages: PropTypes.array
};

export default function ChatbotSend({ sendMessage, messages }) {
  return (
<div>
    <div>
      <form
        className=""
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
        <input type="text" className="" name="query" placeholder="speak" />
      </form>
    </div>
    </div>
  );
}
