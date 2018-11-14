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

export default class AccountVerificationCheck extends Component {
  render() {
    const {
      closeModal,
      goNext,
    } = this.props;

    return (
      <StickyPanel showBrand>
        <ModalHeader onClose={closeModal} spHeader title="Identity Verification">
          <Text spHeader>Account Verification</Text>
          <Text spBody textAlign="center">You are required to verify your identity</Text>
        </ModalHeader>
        <View spBody>
          <Text type="panelTitle">
            In order to make transactions, please proceed to verify your account with Xfers to activate the following features:
          </Text>
          <View>
            <Checklist title="Make top-ups to your waller" />
            <Checklist title="Withdraw funds to your bank account" />
            {
              // <Checklist title="Increase holding limit of SGDxxx.xx" />
            }
          </View>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={goNext}>Proceed</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
