import React from 'react';
// import PropTypes from 'prop-types';

// Send.PropTypes = {
//   sendMessage: PropTypes.func
// };

export default function Send({ sendMessage }) {
  return (
    <div className="chat-message clearfix">
      <form
        className=""
        onSubmit={event => {
          event.preventDefault();
          const form = event.target;
          const { query } = form.elements;
          sendMessage({ q: query.value });
          form.reset();
        }}>
        <textarea
          id="message-to-send"
          name="query"
          placeholder="Type your message"
          rows="3"
        />
        <i className="fa fa-file-o" />&nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o" />
        <button>Send</button>
      </form>
    </div>
  );
}
