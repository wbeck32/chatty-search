import React from 'react';
import PropTypes from 'prop-types';

Response.PropTypes = {
  response: PropTypes.string
};


export default function Response({ response }) {
  return (
    <div>
      <span>{response}</span>
    </div>
  );
}
