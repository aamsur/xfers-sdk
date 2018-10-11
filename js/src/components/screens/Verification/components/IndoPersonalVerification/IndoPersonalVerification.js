import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ModalHeader, View, FooterButtonGroup, Panel, SectionContainer, Button } from 'XfersComponents'


class IndoPersonalVerification extends Component {
  render() {
    return (
      <View maxWidth="660px">
        <ModalHeader title="IDENTITY VERIFICATION">
          <View textAlign="center">Please prepare your KTP for the following steps.</View>
        </ModalHeader>
        <Panel>
          <SectionContainer>

          </SectionContainer>
          <FooterButtonGroup>
            <Button>Proceed with Verification</Button>
          </FooterButtonGroup>
        </Panel>
      </View>
    )
  }
}

export default IndoPersonalVerification
