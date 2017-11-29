import React from 'react';
import PropTypes from 'prop-types';

Send.PropTypes = {
  sendMessage: PropTypes.func
};

export default function Send({ sendMessage }) {
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
          <input type="text" name="query" />
        </form>
      </div>
    </div>
  );
}
