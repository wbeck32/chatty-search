import React from 'react';
import PropTypes from 'prop-types';

Responses.PropTypes = {
  displayResponses: PropTypes.array
};


export default function Responses({ displayResponses }) {
  return (
    <div class="chat-history">
    <ul>
      {displayResponses.map((response, i) => (
        <li key={i}>{response.value}
          <Response response={response.value} />
        </li>
      ))}
    </ul>
    </div>
  );
}

Response.PropTypes = {
  response: PropTypes.object
};

export function Response({ response }) {
  return (
    <li class="clearfix">
    <div class="response-data align-right">
    <span class="response-data-time">10:10 AM, Today</span>&nbsp; &nbsp;
    <span class="response-data-name">Olia</span>
    <i class="fa fa-circle me"></i></div>
    <div class="response other-response float-right">{response}</div>
  </li>



  );
}
