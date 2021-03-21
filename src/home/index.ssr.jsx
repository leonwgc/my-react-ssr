import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

function render() {
  return ReactDOMServer.renderToString(<App />);
}

export default render;
