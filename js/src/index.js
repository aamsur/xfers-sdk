import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Verification } from './components/screens'
import APIDevelopmentPanel from './wrapper-dev'

class XfersDevelopmentPanel extends Component {
  render() {
    return (
      <div>
        { false ?
          <APIDevelopmentPanel />
          :
          <Verification />
        }
      </div>
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
