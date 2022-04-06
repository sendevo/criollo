import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';
import Criollo from './App.js';

Framework7.use(Framework7React);

ReactDOM.render(
  React.createElement(Criollo),
  document.getElementById('app')
);