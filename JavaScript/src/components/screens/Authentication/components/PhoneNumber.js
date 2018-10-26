import React, { Component } from 'react'
import { StickyPanel, View, Text, FooterButtonGroup, Button, ModalHeader, FormInputGroup } from 'XfersComponents'

class PhoneNumber extends Component {
  render() {

    const {
      phoneNo,
      phoneNoAccepted,
      updatePhoneNo,
      requestOtp,
      goNext,
      closeModal
    } = this.props

    const requestOtpWithCallback = () => {
      requestOtp()
      goNext()
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onClose={closeModal} title="Link Xfers Account" />
        <View spBody>
          <Text type="panelTitle">Enter your mobile number</Text>
          <FormInputGroup
            leftAddonContent="+65"
            value={phoneNo}
            onChange={updatePhoneNo}
            placeholder="98888888"
            caption="We will text a one-time secure link to your mobile to proceed with a mobile verification"
          />
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={requestOtpWithCallback}>Next (Request OTP)</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}

export default PhoneNumber
