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
    const { kycNeeded, kycVerified } = this.props;
    if (!kycVerified && kycNeeded) return <VerificationRequired {...this.props} />
    else if (!kycVerified && !kycNeeded) return <VerificationPending {...this.props} />
  }
}

class VerificationRequired extends Component {
  render() {
    const { closeModal, goNext } = this.props;
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

class VerificationPending extends Component {
  render() {
    const { closeModal, goNext } = this.props;
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
          <View marginBottom="20px">
            <Text type="blur">Please allow 7 working days for your account to be verified. You will receive an email notification once the verification is completed.</Text>
          </View>
          <FooterButtonGroup>
            <Button type="primary" onClick={closeModal}>Got it</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
