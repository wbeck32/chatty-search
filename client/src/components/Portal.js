import React from 'react';
import { transform } from 'babel-core';
import * as babel from 'babel-core';
const { render, Text } = require('@mainframe/bot-ui')


export default function Portal({}) {
  const ui = render(<Text>Hello bot!</Text>)
  babel.transform(ui)
console.log(11,ui)
  return (
    <div id="chatty-search">
    {ui.props.children}
  </div>

  );
}
