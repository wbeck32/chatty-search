import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`;


Choose.PropTypes = {
  // sendMessage: PropTypes.func
};

export default function Choose({  }) {
  return (
<ul>
<li className="clearfix">
<div className="message-data">
<Button>Yes</Button><Button>No</Button>
<div className="message other-message float-right"></div>
</div>
</li>
</ul>

  );

}