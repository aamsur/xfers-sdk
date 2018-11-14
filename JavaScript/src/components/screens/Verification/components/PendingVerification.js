import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  Button,
  Checklist,
  FooterButtonGroup
} from 'XfersComponents'

export default class PendingVerification extends Component {
  render() {
    const {
      closeModal,
      goNext,
    } = this.props;

    return (
      <StickyPanel showBrand>
        <ModalHeader onClose={closeModal} spHeader title="Identity Verification" />
        <View spBody>
          <Text type="panelTitle">
            Your identity is pending verification
          </Text>
          <View>
            <Checklist title="Front and Back of NRIC" />
            <Checklist title="Proof of Address" />
          </View>
        </View>
        <View spFooter>
          <Text type="blur">Please allow 7 working days for your account to be verified. You will receive an email notification once the verification is completed.</Text>
        </View>
      </StickyPanel>
    )
  }
}
