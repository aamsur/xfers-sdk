import React, { Component } from 'react'
import { Panel, PanelTitle, SectionContainer, Button } from 'XfersComponents'
import { Xfers } from './wrappers'

export default class APIDevelopmentPanel extends Component {
  constructor() {
    super();
    this.state = { data: null }
  }

  testAPIRequest = () => {
    const self = this;

    const xfers = new Xfers("eFM7UGXdvQsoz31-wKEsBegQJxbN29BkZN7Hhps2T74", {
      test: true,
      secretToken: "TZQgy_ZgmHARrAUbAH_zYRVKyRcynELVZfbYn5zWSzg"
    });

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
        <SectionContainer paddingTop paddingBtm>
          <PanelTitle>APIs Development Panel</PanelTitle>
          <Button onClick={this.testAPIRequest}>Click me to send Http Request</Button>
          <br/><br/>
          <div>
            This is the response: <br/>
            {data}
          </div>
        </SectionContainer>
      </Panel>
    )
  }
}
