import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { Panel, Button, FooterButtonGroup, PanelTitle } from 'XfersBasicComponents'
import { SectionContainer } from 'XfersLayoutComponents'

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

class Verification extends Component {
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

const ConnectedVerification = connect(mapStateToProps, mapDispatchToProps)(Verification);

const VerificationModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedVerification />
  </Provider>
)

export default VerificationModal
