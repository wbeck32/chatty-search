import React from 'react';
import PropTypes from 'prop-types';

Message.PropTypes = {
  message: PropTypes.string
};

export default function Message( {message} ) {

  return (
    <div>
        <span>{message.value}</span>
    </div>
  );
}
