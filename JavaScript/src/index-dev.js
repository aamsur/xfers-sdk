import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Verification, TopUp, ManageBank, Payment } from './components/screens'
import APIDevelopmentPanel from './wrapper-dev'

import { PaymentFlow } from './wrappers/interfaces/PaymentFlow'

class XfersDevelopmentPanel extends Component {
  render() {
    return (
      <div>
        <ManageBank />
        { false &&
          <APIDevelopmentPanel />
        }
      </div>
    )
  }
}


this.element = new PaymentFlow("xfers_elements", "YTB7iBVauTzJ8zyk6cJ3ooTKUGJMQ-SYDPxFNFTDs4E");
// ReactDOM.render(
//   React.createElement(XfersDevelopmentPanel),
//   document.getElementById('xfers_elements')
// );

if (module.hot) {
  module.hot.accept();
}
