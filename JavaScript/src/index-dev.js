import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Verification, TopUp, ManageBank, Payment } from './components/screens'
import APIDevelopmentPanel from './wrapper-dev'

class XfersDevelopmentPanel extends Component {
  render() {
    return (
      <div>
        <Payment />
        { false &&
          <APIDevelopmentPanel />
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
