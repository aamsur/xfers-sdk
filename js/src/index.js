import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Verification } from './components/modals'

class XfersDevelopmentPanel extends Component {
  render() {
    return (
      <Verification />
    )
  }
}

ReactDOM.render(
  React.createElement(XfersDevelopmentPanel),
  document.getElementById('xfers_elements')
);

if (module.hot) {
  module.hot.accept();
}
