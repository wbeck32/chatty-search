import React from 'react';
import PropTypes from 'prop-types';

Response.PropTypes = {
  response: PropTypes.string
};


export default function Response({ response }) {
  console.log(55,response)
  return (
    <div>
      <span>{response}</span>
    </div>
  );
}
