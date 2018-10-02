import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel, Button, FooterButtonGroup, PanelTitle } from 'XfersBasicComponents'
import { SectionContainer } from 'XfersLayoutComponents'

class XfersDevelopmentPanel extends Component {
  render() {
    return (
      <Panel>
        <SectionContainer paddingTop>
          <PanelTitle
            caption="This is a development panel to showcase Xfers UI Library">
            Xfers UI Library
          </PanelTitle>
        </SectionContainer>
        <FooterButtonGroup>
          <Button xType="primary">Primary Button</Button>
          <Button xType="secondary">Secondary Button</Button>
        </FooterButtonGroup>
      </Panel>
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
