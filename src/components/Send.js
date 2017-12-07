import React from 'react';

export default function Send({ lastMsg, witMessage }) {
  return (
    <div className="chat-message clearfix">
      <form
        className=""
        onSubmit={event => {
          event.preventDefault();
          const form = event.target;
          const { query } = form.elements;
          witMessage({ value: query.value, intent: lastMsg.intent });
          form.reset();
        }}>
        <textarea
          id="message-to-send"
          name="query"
          placeholder="Speak!"
          rows="3"
        />
        <i className="fa fa-file-o" />&nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o" />
        <button>Send</button>
      </form>
    </div>
  );
}
