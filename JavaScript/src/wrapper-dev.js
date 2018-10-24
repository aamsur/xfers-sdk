import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel, PanelTitle, View, Button } from 'XfersComponents'
import { Verification, TopUp, ManageBank, Payment } from './components/screens'
// import { Xfers } from './wrappers'

export default class XfersDevelopmentPanel extends Component {
  constructor() {
    super();
    this.state = { data: null }

    // Coinhako User Keys
    this.accessToken = '2XWnEcCMufhqxpK6LsEiQVoE1UBPNG3fELCzNvUPhf4'
  }

  testAPIRequest = () => {
    const self = this;

    // const xfers = new Xfers(this.accessToken, { test: true });
    // xfers.loginUser({phone_no: "94463205"});
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ManageBank />
        { false &&
          <Panel>
            <View paddingTop paddingBtm>
              <PanelTitle>APIs Development Panel</PanelTitle>
              <Button onClick={this.testAPIRequest}>Click me to send Http Request</Button>
              <br/><br/>
              <div>
                This is the response: <br/>
                {data}
              </div>
            </View>
          </Panel>
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
