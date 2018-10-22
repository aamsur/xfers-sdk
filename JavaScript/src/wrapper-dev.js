import React, { Component } from 'react'
import { Panel, PanelTitle, View, Button } from 'XfersComponents'
import { Xfers } from './wrappers'

export default class APIDevelopmentPanel extends Component {
  constructor() {
    super();
    this.state = { data: null }

    // Coinhako User Keys
    this.accessToken = '2XWnEcCMufhqxpK6LsEiQVoE1UBPNG3fELCzNvUPhf4'
  }

  testAPIRequest = () => {
    const self = this;

    const xfers = new Xfers(this.accessToken, { test: true });
    xfers.loginUser({phone_no: "94463205"});
      // .then((res) => {
      //   self.setState({ data: res });
      // })
      // .catch((error) => {
      //   console.log("Error Bro: ", error);
      // });
  }

  render() {
    const { data } = this.state;
    return (
      <Panel>
        <View layout="section" paddingTop paddingBtm>
          <PanelTitle>APIs Development Panel</PanelTitle>
          <Button onClick={this.testAPIRequest}>Click me to send Http Request</Button>
          <br/><br/>
          <div>
            This is the response: <br/>
            {data}
          </div>
        </View>
      </Panel>
    )
  }
}
